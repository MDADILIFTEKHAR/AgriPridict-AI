# AgriPredict AI Architecture

## High-Level Architecture
Client -> Vite React Frontend -> FastAPI Backend -> PostgreSQL / Redis -> AI Services

## Components
- Frontend: Landing page, dashboards, forms, maps, charts
- Backend API: Authentication, farm, weather, disease, market, notifications, chatbot
- Data Stores: PostgreSQL for structured records, Redis for caching and queueing
- AI Layer: forecasting models, disease detection service, multilingual chatbot engine

## Security
- JWT-based auth
- RBAC for farmers, FPOs, officers, admins
- Encrypted secrets and environment-based configuration
- Rate limiting and request validation
