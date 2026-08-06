from fastapi import APIRouter, HTTPException, Response, Request
from models.user_model import UserRegister, UserLogin, UserUpdate
from services.auth_service import hash_password, verify_password, create_token, decode_token
from database.connection import get_db
from bson import ObjectId
from datetime import datetime

router = APIRouter(prefix="/auth", tags=["Authentication"])

def get_user_dict(user) -> dict:
    return {
        "id": str(user["_id"]),
        "full_name": user["full_name"],
        "email": user["email"],
        "created_at": user["created_at"]
    }

@router.post("/register")
async def register(data: UserRegister, response: Response):
    db = get_db()
    existing = await db.users.find_one({"email": data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = {
        "full_name": data.full_name,
        "email": data.email,
        "password": hash_password(data.password),
        "created_at": datetime.utcnow()
    }

    result = await db.users.insert_one(user)
    user["_id"] = result.inserted_id
    token = create_token({"user_id": str(result.inserted_id)})

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=43200 * 60
    )

    return {"message": "Registration successful", "user": get_user_dict(user)}


@router.post("/login")
async def login(data: UserLogin, response: Response):
    db = get_db()
    user = await db.users.find_one({"email": data.email})
    if not user or not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_token({"user_id": str(user["_id"])})

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=43200 * 60
    )

    return {"message": "Login successful", "user": get_user_dict(user)}


@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logged out successfully"}


@router.get("/me")
async def get_me(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    db = get_db()
    user = await db.users.find_one({"_id": ObjectId(payload["user_id"])})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return get_user_dict(user)


@router.put("/profile")
async def update_profile(data: UserUpdate, request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    db = get_db()
    await db.users.update_one(
        {"_id": ObjectId(payload["user_id"])},
        {"$set": data.model_dump(exclude_none=True)}
    )

    user = await db.users.find_one({"_id": ObjectId(payload["user_id"])})
    return get_user_dict(user)