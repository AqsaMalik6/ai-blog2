from duckduckgo_search import AsyncDDGS
from typing import List, Dict
import asyncio


class WebSearchService:
    def __init__(self):
        # We'll create the instance inside the async method to ensure it's in the correct loop
        pass

    async def search_topic(self, query: str, max_results: int = 5) -> List[Dict]:
        """
        Perform web search on a given topic using AsyncDDGS
        """
        try:
            results = []
            async with AsyncDDGS() as ddgs:
                async for result in ddgs.atext(query, max_results=max_results):
                    results.append(result)
            
            # Simple list to hold results after the context manager closes
            search_data = results

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
            print(f"Search error: {str(e)}")
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

        return unique_results[:10]
