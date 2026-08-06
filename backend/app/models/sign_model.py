from pydantic import BaseModel
from typing import Optional

class SignCreate(BaseModel):
    name: str
    category: str
    description: str
    how_to: str
    image_url: Optional[str] = None

class SignResponse(BaseModel):
    id: str
    name: str
    category: str
    description: str
    how_to: str
    image_url: Optional[str] = None