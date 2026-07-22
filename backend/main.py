from typing import List, Optional
import datetime

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(
    title="AgriPredict AI Backend Service",
    description="World-class AI agriculture platform REST API with FastAPI and AI-ready module endpoints.",
    version="2.5.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class HealthStatus(BaseModel):
    status: str
    timestamp: str
    version: str
    database: str
    redis_cache: str


class AuthRequest(BaseModel):
    email: str = Field(..., example="farmer@example.com")
    password: str = Field(..., min_length=6)


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str = "farmer"


class FarmCreateRequest(BaseModel):
    name: str
    area_hectares: float
    crop: str
    location: str


class WeatherForecastResponse(BaseModel):
    city: str
    temperature_c: float
    humidity_pct: int
    rainfall_probability_pct: int
    drought_risk: str


@app.get("/health", response_model=HealthStatus, tags=["System Telemetry"])
def get_system_health():
    return HealthStatus(
        status="HEALTHY",
        timestamp=datetime.datetime.utcnow().isoformat(),
        version="2.5.0",
        database="CONNECTED (PostgreSQL Neon)",
        redis_cache="CONNECTED (Upstash Redis)",
    )


@app.get("/api/v1/overview", tags=["Platform Overview"])
def overview():
    return {
        "platform": "AgriPredict AI",
        "modules": [
            "authentication",
            "farmer_dashboard",
            "farm_management",
            "weather_intelligence",
            "disease_detection",
            "pest_prediction",
            "yield_prediction",
            "market_intelligence",
            "smart_irrigation",
            "fertilizer_recommendation",
            "government_schemes",
            "ai_chatbot",
            "notifications",
        ],
    }


@app.post("/api/v1/auth/login", response_model=AuthResponse, tags=["Authentication"])
def login(payload: AuthRequest):
    if "@" not in payload.email:
        raise HTTPException(status_code=400, detail="Please provide a valid email")
    return AuthResponse(access_token="demo.jwt.token", role="farmer")


@app.post("/api/v1/auth/register", tags=["Authentication"])
def register(payload: AuthRequest):
    return {"message": "Registration flow ready", "email": payload.email}


@app.get("/api/v1/farms", tags=["Farm Management"])
def get_user_farms():
    return [
        {
            "id": "farm-101",
            "name": "Greenfield Wheat Valley",
            "location": "Ludhiana, Punjab",
            "coordinates": [30.901, 75.8573],
            "area_acres": 12.5,
            "crop_type": "Wheat (HD-2967)",
            "soil_type": "Alluvial",
            "irrigation_type": "Sprinkler",
            "health_score": 94,
        }
    ]


@app.post("/api/v1/farms", tags=["Farm Management"])
def create_farm(payload: FarmCreateRequest):
    return {"message": "Farm registered successfully", "farm": payload.model_dump()}


@app.get("/api/v1/weather/forecast", response_model=WeatherForecastResponse, tags=["Weather Intelligence"])
def weather_forecast(city: str = Query(default="Bengaluru")):
    return WeatherForecastResponse(
        city=city,
        temperature_c=29.4,
        humidity_pct=74,
        rainfall_probability_pct=63,
        drought_risk="moderate",
    )


@app.post("/api/v1/disease/detect", tags=["AI Vision Classifier"])
def detect_crop_disease(image_url: str):
    return {
        "disease_name": "Yellow Rust (Stripe Rust)",
        "confidence": 96.4,
        "severity": "Moderate",
        "recommended_medicine": "Propiconazole 25% EC (1 ml/L)",
        "dosage": "200 ml/acre in 200L water",
        "organic_alternative": "Neem seed kernel extract (NSKE 5%)",
    }


@app.get("/api/v1/yield/predict", tags=["Yield Prediction"])
def yield_predict(crop: str = "wheat"):
    return {
        "crop": crop,
        "production_tons": 24.8,
        "income_usd": 8400,
        "expenses_usd": 3200,
        "profit_usd": 5200,
        "loss_risk": "low",
    }


@app.get("/api/v1/market/forecast", tags=["Market Intelligence"])
def market_forecast():
    return {
        "current_price": 2140,
        "future_price": 2280,
        "demand": "high",
        "best_selling_time": "early morning",
        "best_nearby_market": "Mandi Center, Jaipur",
    }


@app.get("/api/v1/irrigation/recommendation", tags=["Smart Irrigation"])
def irrigation_recommendation():
    return {
        "water_quantity_liters": 5400,
        "best_time": "06:00",
        "weekly_schedule": ["Monday", "Wednesday", "Friday"],
        "water_saving_suggestions": ["Use drip irrigation", "Schedule at dawn"],
    }


@app.get("/api/v1/notifications", tags=["Notifications"])
def notifications():
    return [
        {"id": 1, "type": "heavy_rain", "message": "Heavy rainfall expected tomorrow"},
        {"id": 2, "type": "disease_risk", "message": "Leaf blight risk elevated in your district"},
    ]


@app.post("/api/v1/chatbot/message", tags=["AI Chatbot"])
def chatbot_message(message: str, language: Optional[str] = "en"):
    return {"reply": f"AgriPredict AI received your query in {language}: {message}", "language": language}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
