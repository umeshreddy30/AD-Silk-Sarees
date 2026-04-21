# AD Silk Sarees

> **A full-stack e-commerce platform for premium silk sarees — with product browsing, cart management, and a FastAPI backend. Live on Vercel.**

[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688)](https://fastapi.tiangolo.com)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248)](https://mongodb.com)
[![Live](https://img.shields.io/badge/Live%20Demo-ad--silk--sarees.vercel.app-success)](https://ad-silk-sarees.vercel.app)

---

## 🔗 Live Demo

**[https://ad-silk-sarees.vercel.app](https://ad-silk-sarees.vercel.app)**

---

## What is AD Silk Sarees?

AD Silk Sarees is a production-deployed e-commerce application for browsing and purchasing premium silk sarees. It features a modern React frontend with a Python-powered REST API backend, backed by MongoDB for product and order data.

The project demonstrates a complete full-stack workflow — from UI/UX design through API development to cloud deployment.

---

## Features

- **Product catalog** — browse sarees with filtering by type, color, and price
- **Product detail pages** — high-quality descriptions and specifications
- **Shopping cart** — add, remove, update quantities
- **Search** — find sarees by name or category
- **Responsive design** — works on mobile and desktop
- **REST API** — full CRUD backend with FastAPI + Pydantic validation
- **MongoDB integration** — with in-memory fallback for development

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│          React + Vite Frontend                   │
│          (Deployed on Vercel)                    │
│                                                 │
│  ProductCatalog → ProductDetail → Cart → Order  │
└──────────────────────┬──────────────────────────┘
                       │ REST API (JSON)
┌──────────────────────▼──────────────────────────┐
│          FastAPI Backend                         │
│          Pydantic models + input validation      │
│                                                 │
│  GET /products     POST /cart                   │
│  GET /products/:id DELETE /cart/:id             │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│          MongoDB Atlas                           │
│          (with in-memory fallback)               │
└─────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Python, FastAPI, Uvicorn |
| Data Validation | Pydantic |
| Database | MongoDB (in-memory fallback for dev) |
| Deployment | Vercel (frontend) |

---

## Getting Started

### Run the Frontend

```bash
cd ad-silk-sarees
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Run the Backend

```bash
cd server
python -m venv .venv

# Windows
source .venv/Scripts/activate

# Mac/Linux
source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload
```

API available at [http://localhost:8000](http://localhost:8000)  
API docs at [http://localhost:8000/docs](http://localhost:8000/docs) (Swagger UI)

---

## Project Structure

```
AD-Silk-Sarees/
├── ad-silk-sarees/          # React frontend
│   ├── src/
│   │   ├── components/      # ProductCard, Cart, Navbar
│   │   ├── pages/           # Home, ProductDetail, Cart
│   │   └── api/             # Backend API calls
│   ├── public/
│   └── vite.config.js
│
└── server/                  # FastAPI backend
    ├── app/
    │   ├── main.py          # FastAPI entry point
    │   ├── models.py        # Pydantic schemas
    │   ├── routes/          # products, cart, orders
    │   └── database.py      # MongoDB connection
    └── requirements.txt
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/products` | List all products |
| GET | `/products/{id}` | Get product by ID |
| GET | `/products?category=pattu` | Filter by category |
| POST | `/cart` | Add item to cart |
| GET | `/cart/{session_id}` | Get cart |
| DELETE | `/cart/{item_id}` | Remove from cart |

---

## Roadmap

- [ ] User authentication (signup/login)
- [ ] Order placement and history
- [ ] Payment gateway integration
- [ ] Admin dashboard for inventory management
- [ ] Wishlist feature
