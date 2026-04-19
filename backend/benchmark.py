import time
import json
from app.services.embedding_service import generate_embedding
from app.services.vector_service import search_chunks, format_retrieved_chunks
from app.services.llm_service import explain_results

# Fallback for colored text in CLI without needing 'termcolor' package
COLORS = {
    "cyan": "\033[96m",
    "yellow": "\033[93m",
    "green": "\033[92m",
    "red": "\033[91m",
    "blue": "\033[94m",
    "bold": "\033[1m",
    "end": "\033[0m"
}

def colored(text, color, attrs=None):
    res = COLORS.get(color, "") + text + COLORS["end"]
    if attrs and "bold" in attrs:
        res = COLORS["bold"] + res
    return res

# Define your test cases here. 
# "query" is the question asked. 
# "expected_keywords" is a list of words or file names that MUST be present in the retrieved chunks for it to count as a "Hit".
TEST_CASES = [
    {
        "query": "How do you define a command in Click?",
        "expected_keywords": ["@click.command", "decorator", "command function"]
    },
    {
        "query": "How are command line options added?",
        "expected_keywords": ["@click.option", "parameters", "default", "help"]
    },
    {
        "query": "How does Click print output to the console?",
        "expected_keywords": ["click.echo", "stdout", "utils"]
    },
    {
        "query": "Where is the core command parsing logic implemented?",
        "expected_keywords": ["core.py", "Command", "invoke", "callback"]
    },
    {
        "query": "How does Click manage context and parameters?",
        "expected_keywords": ["Context", "params", "get_parameter_source"]
    },
    {
        "query": "How are nested commands or CLI groups handled?",
        "expected_keywords": ["Group", "nested commands", "subcommands"]
    },
    {
        "query": "How does Click generate help messages automatically?",
        "expected_keywords": ["help", "auto help", "docstring"]
    },
    {
        "query": "How are arguments different from options in Click?",
        "expected_keywords": ["Argument", "Option", "params"]
    },
    {
        "query": "How does Click handle default values for parameters?",
        "expected_keywords": ["default", "ParameterSource", "type_cast_value"]
    },
    {
        "query": "Where does Click handle command invocation flow?",
        "expected_keywords": ["invoke", "forward", "Command"]
    }
]

def run_benchmark():
    total_queries = len(TEST_CASES)
    hits = 0
    total_latency_ms = 0
    total_retrieval_latency_ms = 0
    total_llm_latency_ms = 0
    
    print(colored("Starting ScopeAI Benchmark...", "cyan", attrs=["bold"]))
    print("-" * 50)
    
    for idx, test in enumerate(TEST_CASES):
        query = test["query"]
        expected = test["expected_keywords"]
        
        print(colored(f"Test {idx + 1}/{total_queries}: ", "yellow") + query)
        
        # 1. Measure Retrieval Latency (Embedding + ChromaDB Search)
        start_retrieval = time.time()
        
        query_embedding = generate_embedding(query)
        results = search_chunks(query_embedding)
        cleaned_chunks = format_retrieved_chunks(results)
        
        end_retrieval = time.time()
        retrieval_latency = (end_retrieval - start_retrieval) * 1000
        total_retrieval_latency_ms += retrieval_latency
        
        # Calculate Accuracy (Hit Rate)
        combined_context = "\n".join(cleaned_chunks)
        # Check if ANY of the expected keywords are in the retrieved chunks
        hit = any(keyword.lower() in combined_context.lower() for keyword in expected)
        if hit:
            hits += 1
            print(colored("  [✓] Retrieval Hit ", "green") + f"({retrieval_latency:.2f} ms)")
        else:
            print(colored("  [✗] Retrieval Miss ", "red") + f"({retrieval_latency:.2f} ms)")
            
        # 2. Measure LLM Generation Latency (Groq Inference)
        start_llm = time.time()
        
        try:
            explanation = explain_results(query, cleaned_chunks)
            end_llm = time.time()
            llm_latency = (end_llm - start_llm) * 1000
            total_llm_latency_ms += llm_latency
            print(colored(f"  [✓] LLM Generation ", "blue") + f"({llm_latency:.2f} ms)")
        except Exception as e:
            print(colored(f"  [✗] LLM Generation Failed: {e}", "red"))
            llm_latency = 0
            
        total_latency_ms += (retrieval_latency + llm_latency)
        print("-" * 50)
        time.sleep(15) # <-- Add this!

        
    # Calculate Final Metrics
    average_latency = total_latency_ms / total_queries
    avg_retrieval_latency = total_retrieval_latency_ms / total_queries
    avg_llm_latency = total_llm_latency_ms / total_queries
    accuracy = (hits / total_queries) * 100
    
    print(colored("\n=== 📊 Benchmark Results ===", "cyan", attrs=["bold"]))
    print(f"Total Queries:        {total_queries}")
    print(f"Accuracy (Hit Rate):  " + colored(f"{accuracy:.2f}%", "green" if accuracy > 70 else "red"))
    print(f"Avg Retrieval Latency:{avg_retrieval_latency:.2f} ms")
    print(f"Avg LLM Latency:      {avg_llm_latency:.2f} ms")
    print(f"Avg Total Latency:    {average_latency:.2f} ms")
    
if __name__ == "__main__":
    run_benchmark()
