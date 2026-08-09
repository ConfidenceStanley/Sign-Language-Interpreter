from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from services.prediction_service import predict_from_landmarks

router = APIRouter(prefix="/predict", tags=["Predict"])


class Landmark(BaseModel):
    x: float
    y: float
    z: float


class PredictRequest(BaseModel):
    landmarks: List[Landmark]


@router.post("/sign")
async def predict_sign(data: PredictRequest):
    landmarks = [{"x": lm.x, "y": lm.y, "z": lm.z} for lm in data.landmarks]
    result = predict_from_landmarks(landmarks)
    return result