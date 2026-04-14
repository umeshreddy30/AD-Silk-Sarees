# AD Silk Sarees

Full-stack saree commerce scaffold based on your blueprint:
- Frontend: React + Vite + Tailwind
- Backend: FastAPI + Pydantic
- Data: MongoDB-ready with in-memory fallback

## Run Frontend

```bash
cd client
npm install
npm run dev
```

## Run Backend

```bash
cd server
python -m venv .venv
source .venv/Scripts/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```



