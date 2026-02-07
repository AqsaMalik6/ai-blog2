
import os
import asyncio
from dotenv import load_dotenv
from agents import Agent, Runner
from openai import AsyncOpenAI
from agents import set_default_openai_client

load_dotenv()

# Attempt 3: Use the legacy endpoint which sometimes maps better for non-native tools
# And explicitly use a model name that is mapped
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai/"

client = AsyncOpenAI(
    api_key=GEMINI_API_KEY,
    base_url=BASE_URL,
    default_headers={"X-Goog-Api-Key": GEMINI_API_KEY} # Add header manualy
)
set_default_openai_client(client, use_for_tracing=False)

async def main():
    print("Testing V3...")
    agent = Agent(name="Test", instructions="Hi", model="gemini-1.5-flash") # Try 1.5-flash standard
    try:
        result = await Runner.run(agent, "Hi")
        print(result.final_output)
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())
