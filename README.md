# 🌾 AgriPredict AI — Agriculture Intelligence Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Python Version](https://img.shields.io/badge/python-3.9%2B-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-v2.5.0-009688.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg)](https://tailwindcss.com/)

**AgriPredict AI** is a state-of-the-art AI-powered agriculture intelligence platform designed to help farmers, FPOs (Farmer Producer Organizations), agricultural officers, and institutions anticipate weather risks, crop diseases, pest outbreaks, yield variations, and market pricing before they impact agricultural output.

---

## 🚀 Key Features

- **🌤️ Weather Intelligence & Risk Forecasting**: Real-time micro-climate tracking, rainfall probability, temperature shifts, and drought risk analysis.
- **🔬 AI Vision Disease Detection**: High-accuracy leaf image classification and diagnosis powered by deep learning models with organic and chemical treatment recommendations.
- **🐛 Pest Outbreak Prediction**: Early warning systems and pest pressure monitoring based on regional climate and humidity metrics.
- **📊 Yield & Profitability Prediction**: Production yield forecasting in tons along with income, expense, and profit estimation.
- **📈 Market Price Intelligence**: Real-time mandi price forecasts, demand indicators, best selling times, and optimal market locations.
- **💧 Smart Irrigation & Soil Planning**: Automated water quantity calculation (liters/acre), optimal watering schedules, and conservation strategies.
- **🤖 Multilingual AI Agronomist Chatbot**: Interactive AI assistance supporting queries in multiple regional languages.
- **📢 Government Schemes & Notifications Center**: Timely weather, pest, and subsidy alerts sent directly to registered farmers.

---

## 🛠️ Technology Stack

| Layer | Technology / Tools |
| :--- | :--- |
| **Frontend UI** | React 18, Vite 5, TypeScript, TailwindCSS, Lucide Icons, Recharts, Leaflet / React-Leaflet, Framer Motion |
| **Backend REST API** | Python 3.9+, FastAPI, Pydantic v2, Uvicorn |
| **Data Layer** | PostgreSQL (Neon Database), Redis (Upstash) |
| **AI / ML Layer** | Computer Vision (YOLO/TensorFlow), LLM Assistant (Google Gemini integration) |
| **Containerization** | Docker, Docker Compose |

---

## 📂 Project Directory Structure

```
AGRIPREDIC/
├── app/                  # Frontend Vite + React component library & modular code
├── backend/              # FastAPI application service
│   ├── main.py           # REST API routes & schemas
│   ├── Dockerfile        # Container configuration for backend
│   └── requirements.txt  # Python backend dependencies
├── docs/                 # Platform blueprints & technical specifications
│   ├── api.md            # Complete API endpoints specification
│   ├── architecture.md   # System architecture diagram & security spec
│   └── blueprint.md      # Product vision, roadmap & deployment flow
├── src/                  # Main React frontend source files
│   ├── components/       # Reusable UI components & navigation
│   ├── data/             # Mock datasets and static domain data
│   ├── types/            # TypeScript interfaces & types
│   ├── App.tsx           # Dashboard application root
│   ├── main.tsx          # React application entry point
│   └── index.css         # Custom Tailwind CSS design tokens
├── docker-compose.yml    # Full-stack orchestration file
├── package.json          # Node.js workspace dependencies & scripts
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript compiler options
└── vite.config.ts        # Vite build tool configuration
```

---

## 🔌 API Endpoints Summary

FastAPI automatically generates interactive Swagger documentation at `http://localhost:8000/docs`.

### Telemetry & Authentication
- `GET /health` — System status, uptime, database & cache health check.
- `GET /api/v1/overview` — Platform capabilities and active modules list.
- `POST /api/v1/auth/login` — User login & JWT token generation.
- `POST /api/v1/auth/register` — Farmer & enterprise account registration.

### Core Intelligence Services
- `GET /api/v1/farms` — Fetch registered farm records, crop types, and soil data.
- `POST /api/v1/farms` — Register new agricultural land boundaries and crops.
- `GET /api/v1/weather/forecast` — Fetch city/region microclimate forecasts.
- `POST /api/v1/disease/detect` — Upload/submit crop leaf image for AI diagnosis.
- `GET /api/v1/yield/predict` — Calculate crop yield estimates and projected profit.
- `GET /api/v1/market/forecast` — Retrieve commodity mandi prices and selling advice.
- `GET /api/v1/irrigation/recommendation` — Receive smart watering schedule and quantity advice.
- `GET /api/v1/notifications` — Fetch active emergency weather/pest alerts.
- `POST /api/v1/chatbot/message` — Send queries to multilingual AI Agronomist chatbot.

---

## ⚡ Quick Start Guide

### Prerequisites
- Node.js (v18+) & npm
- Python (v3.9+) & pip
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/MDADILIFTEKHAR/AgriPridict-AI.git
cd AgriPridict-AI
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
The frontend application will be running at `http://localhost:5173`.

### 3. Backend Setup
```bash
cd backend

# Create Python virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# Linux/macOS:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server with Uvicorn
uvicorn main:app --reload --port 8000
```
The backend API server will be available at `http://localhost:8000`.

### 4. Running with Docker Compose
```bash
docker-compose up --build
```

---

## 👤 Maintainer & GitHub Repository

- **GitHub Repository**: [https://github.com/MDADILIFTEKHAR/AgriPridict-AI.git](https://github.com/MDADILIFTEKHAR/AgriPridict-AI.git)
- **Author / Username**: `MDADILIFTEKHAR`
- **Email**: `mdadilali68@gmail.com`

---

## 📜 License
This project is licensed under the [MIT License](LICENSE).
