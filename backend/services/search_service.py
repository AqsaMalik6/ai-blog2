from duckduckgo_search import DDGS
from typing import List, Dict
import asyncio


class WebSearchService:
    def __init__(self):
        self.ddgs = DDGS()

    async def search_topic(self, query: str, max_results: int = 5) -> List[Dict]:
        """
        Perform web search on a given topic
        Returns list of search results with title, snippet, and link
        """
        try:
            # Run search in thread pool to avoid blocking
            loop = asyncio.get_event_loop()
            results = await loop.run_in_executor(
                None, lambda: list(self.ddgs.text(query, max_results=max_results))
            )

            formatted_results = []
            for result in results:
                formatted_results.append(
                    {
                        "title": result.get("title", ""),
                        "snippet": result.get("body", ""),
                        "link": result.get("href", ""),
                    }
                )

            return formatted_results
        except Exception as e:
            print(f"❌ Search error: {str(e)}")
            return []

    async def multi_search(self, topic: str, num_searches: int = 3) -> List[Dict]:
        """
        Perform multiple searches with different query variations
        """
        queries = [
            f"{topic}",
            f"{topic} latest information",
            f"{topic} comprehensive guide",
        ]

        all_results = []
        for query in queries[:num_searches]:
            results = await self.search_topic(query, max_results=3)
            all_results.extend(results)

        # Remove duplicates based on title
        unique_results = []
        seen_titles = set()
        for result in all_results:
            if result["title"] not in seen_titles:
                unique_results.append(result)
                seen_titles.add(result["title"])

        return unique_results[:10]  # Limit to top 10 unique results
