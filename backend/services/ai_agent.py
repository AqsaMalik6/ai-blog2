import google.generativeai as genai
import os
from typing import List, Dict
from dotenv import load_dotenv

load_dotenv()


class GeminiAgent:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("❌ GEMINI_API_KEY not found in environment variables")

        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-pro")

    async def summarize_search_results(self, search_results: List[Dict]) -> str:
        """
        Summarize web search results into key insights
        """
        if not search_results:
            return "No search results found."

        # Format search results for the model
        formatted_results = "\n\n".join(
            [
                f"Source {i+1}: {result['title']}\n{result['snippet']}"
                for i, result in enumerate(search_results)
            ]
        )

        prompt = f"""You are an AI research assistant. Analyze the following web search results and extract the key insights and important information:

{formatted_results}

Provide a concise summary of the main points, trends, and important facts found in these sources."""

        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            print(f"❌ Gemini API error during summarization: {str(e)}")
            return "Error summarizing search results."

    async def generate_blog(self, topic: str, research_summary: str) -> str:
        """
        Generate a professional long-form blog article using Gemini
        """
        prompt = f"""You are a professional blog writer. Write a comprehensive, engaging, and well-structured blog article on the following topic:

**Topic:** {topic}

**Research Insights:**
{research_summary}

Requirements:
- Write a detailed, professional blog article (800-1200 words)
- Include an engaging introduction
- Use clear headings and subheadings
- Provide in-depth analysis and insights
- Include practical examples where relevant
- End with a thoughtful conclusion
- Use a conversational yet professional tone
- Make it informative and valuable to readers

Write the complete blog article now:"""

        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            print(f"❌ Gemini API error during blog generation: {str(e)}")
            return f"Error generating blog: {str(e)}"

    async def process_topic(
        self, topic: str, search_results: List[Dict]
    ) -> Dict[str, str]:
        """
        Complete AI agent workflow:
        1. Summarize search results
        2. Generate blog article
        """
        # Step 1: Summarize research
        research_summary = await self.summarize_search_results(search_results)

        # Step 2: Generate blog
        blog_content = await self.generate_blog(topic, research_summary)

        return {"research_summary": research_summary, "blog_content": blog_content}
