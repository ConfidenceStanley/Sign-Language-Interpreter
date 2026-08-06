from fastapi import APIRouter, HTTPException, Request
from models.session_model import SessionEnd
from services.auth_service import decode_token
from database.connection import get_db
from bson import ObjectId
from datetime import datetime

router = APIRouter(prefix="/sessions", tags=["Sessions"])


def get_current_user_id(request: Request) -> str:
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload["user_id"]


def session_dict(session) -> dict:
    translation = session.get("translation", "")
    words = [w for w in translation.strip().split() if w]
    return {
        "id": str(session["_id"]),
        "user_id": str(session["user_id"]),
        "translation": translation,
        "signs_detected": session.get("signs_detected", []),
        "duration_seconds": session.get("duration_seconds", 0),
        "created_at": session["created_at"],
        "word_count": len(words),
    }


@router.post("/end")
async def end_session(data: SessionEnd, request: Request):
    user_id = get_current_user_id(request)
    db = get_db()

    if not data.translation.strip():
        raise HTTPException(status_code=400, detail="Translation cannot be empty")

    session = {
        "user_id": ObjectId(user_id),
        "translation": data.translation.strip(),
        "signs_detected": data.signs_detected,
        "duration_seconds": data.duration_seconds,
        "created_at": datetime.utcnow(),
    }

    result = await db.sessions.insert_one(session)
    session["_id"] = result.inserted_id
    return session_dict(session)


@router.get("/")
async def get_sessions(request: Request, page: int = 1, limit: int = 10):
    user_id = get_current_user_id(request)
    db = get_db()

    skip = (page - 1) * limit
    total = await db.sessions.count_documents({"user_id": ObjectId(user_id)})
    sessions = await db.sessions.find(
        {"user_id": ObjectId(user_id)}
    ).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)

    return {
        "sessions": [session_dict(s) for s in sessions],
        "total": total,
        "page": page,
        "pages": (total + limit - 1) // limit,
    }


@router.get("/stats")
async def get_stats(request: Request):
    user_id = get_current_user_id(request)
    db = get_db()

    total_sessions = await db.sessions.count_documents({"user_id": ObjectId(user_id)})

    all_sessions = await db.sessions.find(
        {"user_id": ObjectId(user_id)}
    ).to_list(1000)

    total_words = sum(
        len([w for w in s.get("translation", "").strip().split() if w])
        for s in all_sessions
    )

    total_duration = sum(s.get("duration_seconds", 0) for s in all_sessions)

    all_signs = []
    for s in all_sessions:
        all_signs.extend(s.get("signs_detected", []))

    sign_counts = {}
    for sign in all_signs:
        sign_counts[sign] = sign_counts.get(sign, 0) + 1

    top_signs = sorted(sign_counts.items(), key=lambda x: x[1], reverse=True)[:5]

    return {
        "total_sessions": total_sessions,
        "total_words": total_words,
        "total_signs": len(all_signs),
        "total_duration_seconds": total_duration,
        "top_signs": [{"sign": s, "count": c} for s, c in top_signs],
    }


@router.get("/{session_id}")
async def get_session(session_id: str, request: Request):
    user_id = get_current_user_id(request)
    db = get_db()

    session = await db.sessions.find_one({
        "_id": ObjectId(session_id),
        "user_id": ObjectId(user_id)
    })

    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    return session_dict(session)


@router.delete("/{session_id}")
async def delete_session(session_id: str, request: Request):
    user_id = get_current_user_id(request)
    db = get_db()

    result = await db.sessions.delete_one({
        "_id": ObjectId(session_id),
        "user_id": ObjectId(user_id)
    })

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Session not found")

    return {"message": "Session deleted successfully"}