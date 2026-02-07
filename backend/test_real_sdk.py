import os
import asyncio
from dotenv import load_dotenv
from agents import Agent, Runner, function_tool

# Load environment variables
load_dotenv()

# STRICTLY Configure for Gemini via OpenAI SDK Compatibility
os.environ["OPENAI_API_KEY"] = os.getenv("GEMINI_API_KEY")
os.environ["OPENAI_BASE_URL"] = "https://generativelanguage.googleapis.com/v1beta/openai/"

# Define a simple tool
async def get_weather(city: str) -> str:
    """Get the weather for a city."""
    return f"The weather in {city} is sunny."

async def main():
    print("Testing OpenAI Agents SDK with Gemini Key...")
    
    # define agent
    agent = Agent(
        name="WeatherBot",
        instructions="You are a helpful weather assistant.",
        tools=[function_tool(get_weather)],
        model="gemini-2.0-flash" 
    )

    try:
        # Check if we can run
        result = await Runner.run(agent, "What is the weather in Lahore?")
        print(f"Final Output: {result.final_output}")
        print("SUCCESS: Real SDK is working!")
    except Exception as e:
        print(f"FAILURE: {e}")

if __name__ == "__main__":
    asyncio.run(main())
