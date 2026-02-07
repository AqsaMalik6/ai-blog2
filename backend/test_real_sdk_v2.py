
import os
import asyncio
from dotenv import load_dotenv
from agents import Agent, Runner, function_tool
from openai import AsyncOpenAI  # Import client directly to configure

load_dotenv()

# Gemini requires a specific OpenAI Compatible Endpoint
# The v1beta/openai/ endpoint maps standard OpenAI paths (v1/chat/completions) correctly
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai/"

# We must configure the default client for the Agents SDK
from agents import set_default_openai_client

client = AsyncOpenAI(
    api_key=GEMINI_API_KEY,
    base_url=BASE_URL
)
set_default_openai_client(client, use_for_tracing=False) # Disable tracing to avoid 401s

async def main():
    print("Testing OpenAI Agents SDK with Gemini 2.5 Flash...")
    
    agent = Agent(
        name="TestBot",
        instructions="Say hello.",
        model="gemini-2.0-flash" # Use a known stable model name without 'models/' prefix
    )

    try:
        result = await Runner.run(agent, "Hi there")
        print(f"Final Output: {result.final_output}")
    except Exception as e:
        print(f"FAILURE: {e}")

if __name__ == "__main__":
    asyncio.run(main())
