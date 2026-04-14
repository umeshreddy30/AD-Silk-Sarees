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

## Environment Variables (server/.env)

```env
MONGO_URI=
MONGO_DB_NAME=ad_silk_sarees
JWT_SECRET=replace-me
ACCESS_TOKEN_MINUTES=60
REFRESH_TOKEN_MINUTES=10080
ADMIN_EMAIL=admin@adsilk.in
ADMIN_PASSWORD=admin123
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

## Environment Variables (client/.env)

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_RAZORPAY_KEY_ID=
```
