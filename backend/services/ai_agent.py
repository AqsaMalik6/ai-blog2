import os
from dotenv import load_dotenv
import asyncio
from typing import List, Dict
from datetime import datetime
from agents import Agent, Runner, function_tool
from .search_service import WebSearchService

load_dotenv()

# Configure environment for Gemini's OpenAI Compatibility
os.environ["OPENAI_API_KEY"] = os.getenv("GEMINI_API_KEY")
os.environ["OPENAI_BASE_URL"] = "https://generativelanguage.googleapis.com/v1beta/openai/"

async def search_tool(topic: str) -> str:
    """
    Perform deep web research on a blog topic. 
    Use this when you need facts, trends, or specific data for a blog.
    """
    search_service = WebSearchService()
    results = await search_service.multi_search(topic)
    if not results:
        return "No search results found."
    
    return "\n\n".join([f"Source: {r['title']}\n{r['snippet']}" for r in results])

class GeminiAgent:
    """
    Refactored Blog Agent based on OpenAI Agents SDK.
    """
    def __init__(self):
        import google.generativeai as genai
        # Configure Gemini directly
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        self.model = genai.GenerativeModel('gemini-2.5-flash')

    async def process_topic(self, topic: str, search_results: List[Dict] = None) -> Dict[str, str]:
        try:
            # We maintain the SDK-like structure but use Gemini's native method to avoid 404 errors
            # The OpenAI Agents SDK 'Runner' tries to hit OpenAI endpoints which fail with Gemini keys
            
            # Step 1: Search (We call the tool manually as the 'Runner' would have)
            research_content = await search_tool(topic)
            
            # Step 2: Generate Blog using Gemini Native
            current_time = datetime.now().strftime("%A, %B %d, %Y")
            prompt = f"""You are a professional and polite AI Blog Agent.
Today's Date: {current_time}.

User Query: "{topic}"

Research Context:
{research_content}

Instructions:
1. Determine if this is a valid blog topic.
2. If VALID: Write a comprehensive, engages, 800-1200 word blog post using the research provided.
3. If INVALID (greeting, math, code, casual): Respond politely in the user's language (e.g. Roman Urdu).
   - "Allah Hafiz" -> Warm goodbye.
   - "Date" -> Only if asked.
   - "Temperature" -> Only if asked.
   - Otherwise, ask for a blog topic.

Output the final response only."""

            response = self.model.generate_content(prompt)
            
            # Mimic Agent SDK 'last_agent' and 'final_output' behavior
            self.last_run_result = {
                "final_output": response.text,
                "last_agent": "AI-Blog-Agent",
                "new_items": ["MessageOutputItem"], # Placeholder for SDK parity
            }
            
            return {
                "blog_content": response.text,
                "research_summary": "Extracted via Gemini Native Agent"
            }
        except Exception as e:
            print(f"Agent Execution Error: {str(e)}")
            # Return error as content so UI can display it
            return {"blog_content": f"System Error: {str(e)}", "research_summary": ""}

    async def _generate_with_fallback(self, prompt: str) -> str:
        result = await Runner.run(self.blog_agent, prompt)
        return result.final_output
