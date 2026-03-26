# Silk Saree Store — Setup & Deployment Guide

## Prerequisites

- Node.js 18+
- Python 3.9+
- npm
- A [Supabase](https://supabase.com) account (free tier works)
- A [Razorpay](https://razorpay.com) account (for payments)

---

## 1. Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your:
   - **Project URL** (e.g., `https://abc123.supabase.co`)
   - **Anon Key** (from Settings > API)
   - **Service Role Key** (from Settings > API — keep this SECRET)

3. **Run the database schema:**
   - Go to SQL Editor in Supabase Dashboard
   - Copy the contents of `database/schema.sql`
   - Run it — this creates all tables, RLS policies, triggers, and seed data

4. **Enable Google OAuth:**
   - Go to Authentication > Providers > Google
   - Add your Google OAuth Client ID and Secret
   - Set redirect URL to: `https://your-frontend-url.com/auth/callback`

5. **Create Storage Buckets:**
   - Go to Storage > New Bucket
   - Create `product-images` (set as Public)
   - Create `avatars` (set as Public)

6. **Make yourself admin:**
   - After signing up on the app, run this SQL:
   ```sql
   UPDATE public.profiles SET role = 'admin' WHERE email = 'your@email.com';
   ```

---

## 2. Frontend Setup (Next.js)

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local with your keys:
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
# NEXT_PUBLIC_API_URL=http://localhost:8000/api
# NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id

# Run dev server
npm run dev
```

Frontend will be at: http://localhost:3000

---

## 3. Backend Setup (FastAPI)

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env with your keys:
# SUPABASE_URL=your_supabase_url
# SUPABASE_SERVICE_KEY=your_service_role_key
# RAZORPAY_KEY_ID=your_razorpay_key_id
# RAZORPAY_KEY_SECRET=your_razorpay_key_secret
# FRONTEND_URL=http://localhost:3000

# Run dev server
uvicorn app.main:app --reload --port 8000
```

Backend API will be at: http://localhost:8000
API docs at: http://localhost:8000/docs

---

## 4. Deploy Frontend to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) > Add New Site > Import from Git
3. Select your repo, set:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/.next`
4. Add environment variables (from `.env.local`)
5. Install the `@netlify/plugin-nextjs` plugin
6. Deploy!

Alternative: Deploy via CLI:
```bash
cd frontend
npx netlify-cli deploy --build --prod
```

---

## 5. Deploy Backend to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) > New Project > Import Git Repository
3. Set **Root Directory** to `backend`
4. Vercel will auto-detect the Python project via `vercel.json`
5. Add environment variables (from `.env`)
6. Deploy!

Alternative: Deploy via CLI:
```bash
cd backend
npx vercel --prod
```

---

## 6. Post-Deployment

1. Update frontend `.env` with deployed backend URL:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.vercel.app/api
   ```

2. Update backend `.env` with deployed frontend URL:
   ```
   FRONTEND_URL=https://your-frontend.netlify.app
   ```

3. Update Supabase Auth redirect URL to your production frontend URL

4. Switch Razorpay from test keys to live keys when ready

---

## Project Structure

```
Saree/
├── frontend/          # Next.js (Netlify)
├── backend/           # FastAPI (Vercel)
├── database/          # Supabase schema SQL
└── docs/              # This file
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, Tailwind CSS v4, Framer Motion |
| Backend | FastAPI, Python 3.9+ |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (Google OAuth + Email) |
| Storage | Supabase Storage |
| Payments | Razorpay |
| Frontend Hosting | Netlify |
| Backend Hosting | Vercel Serverless |
