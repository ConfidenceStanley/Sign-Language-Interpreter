from fastapi import APIRouter
from database.connection import get_db
from bson import ObjectId

router = APIRouter(prefix="/signs", tags=["Signs"])


def sign_dict(sign) -> dict:
    return {
        "id": str(sign["_id"]),
        "name": sign["name"],
        "category": sign["category"],
        "description": sign["description"],
        "how_to": sign["how_to"],
        "image_url": sign.get("image_url", ""),
    }


@router.get("/")
async def get_all_signs():
    db = get_db()
    signs = await db.signs.find().to_list(100)
    return [sign_dict(s) for s in signs]


@router.get("/categories")
async def get_categories():
    db = get_db()
    categories = await db.signs.distinct("category")
    return categories


@router.get("/category/{category}")
async def get_signs_by_category(category: str):
    db = get_db()
    signs = await db.signs.find({"category": category}).to_list(100)
    return [sign_dict(s) for s in signs]


@router.get("/search")
async def search_signs(q: str = ""):
    db = get_db()
    signs = await db.signs.find({
        "$or": [
            {"name": {"$regex": q, "$options": "i"}},
            {"description": {"$regex": q, "$options": "i"}},
            {"category": {"$regex": q, "$options": "i"}},
        ]
    }).to_list(100)
    return [sign_dict(s) for s in signs]


@router.get("/{sign_id}")
async def get_sign(sign_id: str):
    db = get_db()
    sign = await db.signs.find_one({"_id": ObjectId(sign_id)})
    if not sign:
        return {"error": "Sign not found"}
    return sign_dict(sign)