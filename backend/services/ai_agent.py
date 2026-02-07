import os
from dotenv import load_dotenv
from datetime import datetime
from agents import Agent, Runner, function_tool, OpenAIChatCompletionsModel, set_tracing_disabled
from openai import AsyncOpenAI
from openai.resources.chat import AsyncChat, AsyncCompletions
from typing import Any, Mapping, List, Dict
from backend.services.search_service import WebSearchService

load_dotenv()

# Configure environment for Gemini's OpenAI Compatibility
# Using v1beta consistently
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai/"

os.environ["OPENAI_API_KEY"] = GEMINI_API_KEY
os.environ["OPENAI_BASE_URL"] = GEMINI_BASE_URL

# Disable tracing as it requires a real OpenAI key
set_tracing_disabled(True)

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

class GeminiSanitizedCompletions(AsyncCompletions):
    """
    Wrapper for chat.completions to filter out params Gemini doesn't support yet.
    """
    def __init__(self, client: AsyncOpenAI):
        super().__init__(client)
        self._raw_create = super().create

    async def create(self, *args, **kwargs) -> Any:
        # Remove unsupported parameters that cause 404/400 errors in Gemini
        kwargs.pop("store", None)
        kwargs.pop("stream_options", None) 
        kwargs.pop("parallel_tool_calls", None) # Gemini handles tools, but sometimes strict parallel mode fails
        
        # Ensure model mapping is correct if needed, but SDK usually handles it
        return await self._raw_create(*args, **kwargs)

class GeminiSanitizedClient(AsyncOpenAI):
    """
    Custom OpenAI Client that injects the sanitizer.
    """
    @property
    def chat(self) -> AsyncChat:
        chat_resource = super().chat
        # Monkey-patch the completions resource instance
        chat_resource.completions = GeminiSanitizedCompletions(self)
        return chat_resource

class GeminiAgent:
    """
    Refactored Blog Agent using REAL OpenAI Agents SDK with Gemini Compatibility.
    """
    def __init__(self):
        current_time = datetime.now().strftime("%A, %B %d, %Y")
        
        # 1. Initialize Custom Client
        self.client = GeminiSanitizedClient(
            api_key=os.getenv("GEMINI_API_KEY"),
            base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
        )

        # 2. Define the Model using SDK's Class but with our Client
        self.model = OpenAIChatCompletionsModel(
            model="gemini-2.5-flash",
            openai_client=self.client
        )
        
        # 3. Define the Agent (Real SDK Class)
        self.blog_agent = Agent(
            name="AI-Blog-Agent",
            instructions=f"""You are a professional and polite AI Blog Agent.
Today's Date: {current_time}.

Workflow:
1. Determine if the user query is a valid blog topic.
2. If it IS a blog topic:
   - If the topic is very broad (e.g., "AI", "AI Ethics"), DO NOT ask for clarification. Instead, write a comprehensive general overview covering the most important aspects.
   - Use the 'search_tool' to gather deep research and facts.
   - Summarize the research insights.
   - Write a comprehensive, engaging, and well-structured professional blog article (800-1200 words).
   - Use headings, subheadings, and a clean professional tone.
   - Return ONLY the blog content.
3. If it is NOT a blog topic (greetings, identity, math, coding, casual talk, byes):
   - Respond in the SAME LANGUAGE/STYLE as the user (e.g., Roman Urdu).
   - Be extremely polite and intelligent (like GPT).
   - Handle 'Allah Hafiz', 'Bye', etc., with warm responses.
   - ONLY provide date if asked for "date" or "today date".
   - ONLY provide temperature if asked for "temperature".
   - Politely explain that you are a Blog Agent and ask for a blog topic if they need one.

Note: Your goal is to write a FULL professional blog, not to offer options or ask for specification unless the topic is completely nonsensical.""",
            tools=[function_tool(search_tool)],
            model=self.model
        )

    async def process_topic(self, topic: str, search_results: List[Dict] = None) -> Dict[str, str]:
        try:
            # 4. Use the REAL Runner (Guaranteed SDK usage)
            result = await Runner.run(self.blog_agent, topic)
            
            raw_content = result.final_output

            # 5. Polish with Gemini (As requested by user)
            polished_content = await self.polish_with_gemini(raw_content)

            # The result is a standard RunResult from the SDK
            return {
                "blog_content": polished_content,
                "research_summary": "Extracted via Real Agent SDK Loop"
            }
        except Exception as e:
            print(f"Agent Execution Error: {str(e)}")
            return {"blog_content": f"System Error: {str(e)}", "research_summary": ""}

    async def polish_with_gemini(self, content: str) -> str:
        """
        Uses Gemini to polish and refine the blog post generated by the SDK.
        """
        # If the content is too short (less than 150 words), it's probably a greeting or clarification, don't polish it as a blog.
        if len(content.split()) < 150:
            return content

        try:
            polish_prompt = (
                "You are a professional blog editor. Please polish and refine the following blog post. "
                "Improve the flow, grammar, and professional tone while keeping the core information intact. "
                "CRITICAL: Return ONLY the polished blog post as plain text or markdown. "
                "DO NOT include any introductory sentences, meta-talk, options, or explanations. "
                "Just the final polished content.\n\n"
                f"{content}"
            )
            
            # Use the same client for polishing
            response = await self.client.chat.completions.create(
                model="gemini-2.5-flash", # Using the new fast 2.5 flash model
                messages=[{"role": "user", "content": polish_prompt}]
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            print(f"Polishing Error: {e}")
            return content # Fallback to raw content if polishing fails
    
    async def _generate_with_fallback(self, prompt: str) -> str:
        result = await Runner.run(self.blog_agent, prompt)
        return result.final_output
