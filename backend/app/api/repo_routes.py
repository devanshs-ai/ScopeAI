from fastapi import APIRouter
from app.services.repo_service import clone_repository
from app.services.parser_service import parse_repository
from app.services.repo_service import safe_delete
from app.services.embedding_service import generate_embedding
from app.services.vector_service import store_chunk
from app.services.vector_service import search_chunks
import uuid
from app.services.vector_service import format_retrieved_chunks
from app.services.llm_service import explain_results

router = APIRouter()

from pydantic import BaseModel

class AnalyzeRepoRequest(BaseModel):
    repo_url: str

class SearchCodeRequest(BaseModel):
    query: str

@router.post("/analyze-repo")
def analyze_repository(request: AnalyzeRepoRequest):

    repo_path = clone_repository(request.repo_url)

    parsed_chunks = parse_repository(repo_path)

    safe_delete(repo_path)

    unique_files = list(set([chunk["file"] for chunk in parsed_chunks]))

    for chunk in parsed_chunks:

        text = ""

        if chunk["type"] == "function" or chunk["type"] == "class":
            text = chunk["code"]

        elif chunk["type"] == "document":
            text = chunk["content"]

        if not text:
            continue

        embedding = generate_embedding(text)

        chunk_id = str(uuid.uuid4())

        metadata = {
            "type": chunk["type"],
            "file": chunk["file"]
        }

        store_chunk(chunk_id, embedding, metadata, text)

    return {
        "chunks_processed": len(parsed_chunks),
        "files": unique_files,
        "vector_db": "Chroma",
        "collection": "code_chunks"
    }

@router.post("/search-code")
def search_code(request: SearchCodeRequest):

    query_embedding = generate_embedding(request.query)

    results = search_chunks(query_embedding)

    cleaned_chunks = format_retrieved_chunks(results)

    explanation = explain_results(request.query, cleaned_chunks)    

    return {
        "query": request.query,
        "context_used":cleaned_chunks,
        "explanation": explanation
    }