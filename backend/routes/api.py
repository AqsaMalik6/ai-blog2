from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from backend.database.database import get_db
from backend.models.models import User, Chat, Message, Blog
from backend.services.search_service import WebSearchService
from backend.services.ai_agent import GeminiAgent
from datetime import datetime

# from backend.services.openai_agent import OpenAIBlogAgent

# openai_agent = OpenAIBlogAgent()
router = APIRouter()

# Initialize services
search_service = WebSearchService()
ai_agent = GeminiAgent()


# Pydantic models for request/response
class TopicRequest(BaseModel):
    topic: str
    user_id: int = 1  # Default user for simplicity


class ChatResponse(BaseModel):
    id: int
    title: str
    created_at: datetime

    class Config:
        from_attributes = True


class MessageResponse(BaseModel):
    id: int
    role: str
    content: str
    created_at: datetime

    class Config:
        from_attributes = True


class BlogResponse(BaseModel):
    id: int
    topic: str
    content: str
    timestamp: datetime

    class Config:
        from_attributes = True


@router.post("/generate-blog")
async def generate_blog(request: TopicRequest, db: Session = Depends(get_db)):
    """
    Main endpoint to generate blog:
    1. Perform web searches
    2. Summarize results
    3. Generate blog with AI
    4. Save to database
    """
    try:
        # Step 1: Get or create user
        user = db.query(User).filter(User.id == request.user_id).first()
        if not user:
            user = User(
                id=request.user_id,
                username=f"user_{request.user_id}",
                email=f"user{request.user_id}@example.com",
            )
            db.add(user)
            db.commit()
            db.refresh(user)

        # Step 2: Create new chat
        chat = Chat(
            user_id=user.id, title=request.topic[:100]  # Truncate title if too long
        )
        db.add(chat)
        db.commit()
        db.refresh(chat)

        # Step 3: Save user message
        user_message = Message(
            chat_id=chat.id,
            role="user",
            content=f"Generate a blog about: {request.topic}",
        )
        db.add(user_message)
        db.commit()

        # Step 4: Perform web searches
        print(f"🔍 Searching for: {request.topic}")
        search_results = await search_service.multi_search(
            request.topic, num_searches=3
        )

        # Step 5: Process with AI agent
        print(f"🤖 Generating blog with AI...")
        ai_result = await ai_agent.process_topic(request.topic, search_results)

        blog_content = ai_result["blog_content"]

        # Step 6: Save blog to database
        blog = Blog(
            user_id=user.id, chat_id=chat.id, topic=request.topic, content=blog_content
        )
        db.add(blog)

        # Step 7: Save assistant message
        assistant_message = Message(
            chat_id=chat.id, role="assistant", content=blog_content
        )
        db.add(assistant_message)

        db.commit()
        db.refresh(blog)

        print(f"✅ Blog generated successfully!")

        return {
            "success": True,
            "chat_id": chat.id,
            "blog_id": blog.id,
            "topic": request.topic,
            "content": blog_content,
            "search_results_count": len(search_results),
        }

    except Exception as e:
        print(f"❌ Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/chats", response_model=List[ChatResponse])
async def get_chats(user_id: int = 1, db: Session = Depends(get_db)):
    """Get all chats for a user"""
    chats = (
        db.query(Chat)
        .filter(Chat.user_id == user_id)
        .order_by(Chat.updated_at.desc())
        .all()
    )
    return chats


@router.get("/chats/{chat_id}/messages", response_model=List[MessageResponse])
async def get_chat_messages(chat_id: int, db: Session = Depends(get_db)):
    """Get all messages for a specific chat"""
    messages = (
        db.query(Message)
        .filter(Message.chat_id == chat_id)
        .order_by(Message.created_at)
        .all()
    )
    return messages


@router.delete("/chats/{chat_id}")
async def delete_chat(chat_id: int, db: Session = Depends(get_db)):
    """Delete a chat and all its messages"""
    chat = db.query(Chat).filter(Chat.id == chat_id).first()
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")

    db.delete(chat)
    db.commit()
    return {"success": True, "message": "Chat deleted successfully"}


@router.get("/blogs", response_model=List[BlogResponse])
async def get_blogs(user_id: int = 1, db: Session = Depends(get_db)):
    """Get all blogs for a user"""
    blogs = (
        db.query(Blog)
        .filter(Blog.user_id == user_id)
        .order_by(Blog.timestamp.desc())
        .all()
    )
    return blogs
