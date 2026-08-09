import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from database.connection import connect_db, close_db
from routes.auth_routes import router as auth_router
from routes.sign_routes import router as sign_router
from routes.session_routes import router as session_router
from routes.image_routes import router as image_router
from routes.predict_routes import router as predict_router
from services.prediction_service import load_model


@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_db()
    load_model()
    yield
    await close_db()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(sign_router)
app.include_router(session_router)
app.include_router(image_router)
app.include_router(predict_router)


@app.get("/")
async def health_check():
    return {"status": "Backend running successfully"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)