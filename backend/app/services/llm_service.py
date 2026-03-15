import os
from pathlib import Path

from dotenv import load_dotenv
from groq import Groq

# Load environment variables from the backend/.env file (even when the working directory differs).
_env_path = Path(__file__).resolve().parents[2] / ".env"
if _env_path.exists():
    load_dotenv(_env_path)

_client = None


def _get_api_key() -> str:
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise RuntimeError(
            "GROQ_API_KEY is not set. Ensure you have a .env file in the backend/ directory "
            "with GROQ_API_KEY=... or set the environment variable before starting the app."
        )
    return api_key


def _get_client() -> Groq:
    global _client
    if _client is None:
        _client = Groq(api_key=_get_api_key())
    return _client


def explain_results(query, retrieved_chunks):
    """Explain the code in the retrieved chunks for the given query."""

    context = "\n\n".join(retrieved_chunks)

    prompt = f"""
You are a senior software engineer explaining code to another developer.

Write the explanation in a clean, readable format.

Formatting rules:
- Use Markdown.
- Use section headings (###).
- Separate sections with horizontal dividers (---).
- Write short paragraphs instead of long blocks.
- Avoid numbered lists unless necessary.
- Explain the code naturally like in technical documentation.

User Question:
{query}

Relevant Code:
{context}

Explain the code clearly.
Keep each paragraph under 4 lines.
"""

    client = _get_client()
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are an expert software engineer."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.4,
    )

    return completion.choices[0].message.content
