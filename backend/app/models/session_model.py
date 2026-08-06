from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class SessionStart(BaseModel):
    pass

class SessionEnd(BaseModel):
    translation: str
    signs_detected: List[str] = []
    duration_seconds: int = 0

class SessionResponse(BaseModel):
    id: str
    user_id: str
    translation: str
    signs_detected: List[str]
    duration_seconds: int
    created_at: datetime
    word_count: int