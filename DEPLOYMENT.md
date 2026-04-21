# 🚀 Deployment Guide - Smart Resume Builder

## Architecture

- **Backend**: Node.js/Express on [Render](https://render.com)
- **Frontend**: React/Vite on [Vercel](https://vercel.com)
- **Database**: Supabase
- **AI**: OpenAI API

---

## 📋 Prerequisites

Before deploying, ensure you have:

1. **Supabase Account** - For authentication & database
2. **OpenAI API Key** - For AI features
3. **GitHub Account** - For Render & Vercel integration
4. **Render Account** - For backend hosting
5. **Vercel Account** - For frontend hosting

---

## 🔧 Setup Steps

### Step 1: Prepare Your Repository

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git push origin main
```

### Step 2: Deploy Backend to Render

#### 2.1 Create Render Service

1. Go to [render.com](https://render.com)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Fill in the deployment settings:
   - **Name**: `smart-resume-builder-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Plan**: Free (or paid as needed)

#### 2.2 Add Environment Variables in Render

In your Render dashboard, add these environment variables:

```
NODE_ENV = production
PORT = 5000
FRONTEND_URL = https://your-frontend.vercel.app
SUPABASE_URL = your_supabase_url
SUPABASE_ANON_KEY = your_supabase_anon_key
OPENAI_API_KEY = your_openai_api_key
```

#### 2.3 Deploy

Click **Deploy** and wait for the build to complete. Your backend URL will be something like:

```
https://smart-resume-builder-backend.onrender.com
```

---

### Step 3: Deploy Frontend to Vercel

#### 3.1 Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Select the `client` folder as the root directory

#### 3.2 Add Environment Variables in Vercel

In Vercel project settings, add these environment variables:

```
VITE_API_URL = https://smart-resume-builder-backend.onrender.com
VITE_SUPABASE_URL = your_supabase_url
VITE_SUPABASE_ANON_KEY = your_supabase_anon_key
```

#### 3.3 Deploy

Vercel will automatically build and deploy. Your frontend URL will be something like:

```
https://your-app.vercel.app
```

#### 3.4 Update Backend FRONTEND_URL

Go back to your Render dashboard and update `FRONTEND_URL` environment variable with your Vercel URL.

---

## 🔐 Environment Variables Reference

### Backend (.env in server/)

| Variable            | Purpose                  | Where to Get            |
| ------------------- | ------------------------ | ----------------------- |
| `NODE_ENV`          | Environment mode         | Set to `production`     |
| `PORT`              | Server port              | Default: 5000           |
| `FRONTEND_URL`      | Your Vercel frontend URL | From Vercel dashboard   |
| `SUPABASE_URL`      | Supabase project URL     | From Supabase dashboard |
| `SUPABASE_ANON_KEY` | Supabase public key      | From Supabase dashboard |
| `OPENAI_API_KEY`    | OpenAI API key           | From OpenAI platform    |

### Frontend (.env.local in client/)

| Variable                 | Purpose                 | Where to Get            |
| ------------------------ | ----------------------- | ----------------------- |
| `VITE_API_URL`           | Your Render backend URL | From Render dashboard   |
| `VITE_SUPABASE_URL`      | Supabase project URL    | From Supabase dashboard |
| `VITE_SUPABASE_ANON_KEY` | Supabase public key     | From Supabase dashboard |

---

## 🧪 Testing After Deployment

### Test Backend Health Check

```bash
curl https://your-backend.onrender.com/
```

Expected response:

```json
{
  "message": "Smart Resume Builder Backend ✅",
  "status": "operational"
}
```

### Test Frontend

Navigate to your Vercel URL and verify:

- ✅ Pages load correctly
- ✅ API calls reach the backend
- ✅ Supabase authentication works
- ✅ AI features respond properly

---

## 🚨 Troubleshooting

### Backend Won't Start

- **Check logs**: View Render logs in dashboard
- **Missing vars**: Ensure all environment variables are set
- **Port issue**: Render automatically assigns PORT from env

### Frontend Shows CORS Errors

- **Backend CORS**: Check `server/index.js` CORS configuration
- **FRONTEND_URL**: Verify it matches in Render environment variables
- **API URL**: Check `VITE_API_URL` in Vercel environment variables

### API Calls Return 404

- **Routes**: Verify routes are prefixed with `/api/` in server
- **Server running**: Check backend service is running (Render dashboard)
- **Network**: Check browser DevTools → Network tab for actual errors

### Supabase Connection Issues

- **Keys correct**: Double-check URL and ANON_KEY in .env files
- **Network policy**: Ensure Render IP is whitelisted (if applicable)
- **RLS**: Check Supabase RLS policies on tables

---

## 📝 Local Development

### Start Backend Locally

```bash
cd server
npm install
npm run dev
```

Backend runs on `http://localhost:5000`

### Start Frontend Locally

```bash
cd client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### Local .env Files

Create `.env.local` in `client/` and `.env` in `server/`:

**client/.env.local**

```
VITE_API_URL=http://localhost:5000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**server/.env**

```
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

---

## 🔄 Continuous Deployment

Both Render and Vercel support automatic deployment:

- **Push to GitHub** → Automatic build and deploy
- **No manual steps needed** once configured

To update in production:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

---

## 📚 Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)

---

## ✅ Deployment Checklist

- [ ] Backend pushed to GitHub
- [ ] Frontend pushed to GitHub
- [ ] Supabase project created and configured
- [ ] OpenAI API key obtained
- [ ] Render service created with env variables
- [ ] Vercel project created with env variables
- [ ] Backend FRONTEND_URL updated after Vercel deployment
- [ ] Tested backend health check
- [ ] Tested frontend loading
- [ ] Tested API calls
- [ ] Tested Supabase authentication
- [ ] Tested AI features

---

Good luck with your deployment! 🚀
