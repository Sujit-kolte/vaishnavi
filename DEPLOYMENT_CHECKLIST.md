# 🚀 Deployment Checklist - Render + Vercel

## Pre-Deployment Setup

### 1. Local Setup

- [ ] Clone repository locally
- [ ] Run `npm install` in both `client/` and `server/`
- [ ] Test backend locally: `cd server && npm run dev`
- [ ] Test frontend locally: `cd client && npm run dev`
- [ ] Verify no console errors in browser

### 2. Prepare Credentials

- [ ] Create Supabase account and project
- [ ] Get Supabase URL and ANON_KEY from dashboard
- [ ] Get OpenAI API key
- [ ] Create GitHub account (if not exists)
- [ ] Create Render account
- [ ] Create Vercel account

### 3. GitHub Setup

- [ ] Initialize git in project root: `git init`
- [ ] Create `.gitignore` entries (already included)
- [ ] Commit all files: `git add . && git commit -m "Initial commit"`
- [ ] Create GitHub repository
- [ ] Push to GitHub: `git push origin main`

---

## Backend Deployment (Render)

### Step 1: Create Render Web Service

- [ ] Go to [render.com](https://render.com)
- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub account
- [ ] Select your repository
- [ ] Fill in:
  - **Service Name**: `smart-resume-builder-backend`
  - **Environment**: Node
  - **Build Command**: `cd server && npm install`
  - **Start Command**: `cd server && npm start`
  - **Plan**: Free (or paid)

### Step 2: Add Environment Variables

In Render Dashboard → Environment:

```
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend.vercel.app  (Add after Vercel deployment)
SUPABASE_URL=<your_supabase_url>
SUPABASE_ANON_KEY=<your_supabase_anon_key>
OPENAI_API_KEY=<your_openai_api_key>
```

- [ ] Add all environment variables
- [ ] **IMPORTANT**: Don't set FRONTEND_URL yet, add it after Vercel deployment

### Step 3: Deploy

- [ ] Click "Create Web Service"
- [ ] Wait for build to complete (2-5 minutes)
- [ ] Check build logs for errors
- [ ] Copy your backend URL: `https://your-service.onrender.com`
- [ ] Test health check: `https://your-service.onrender.com/`
  - Should return: `{"message":"Smart Resume Builder Backend ✅","status":"operational"}`

### Backend Deployment Verification

- [ ] ✅ Service shows "Live" status
- [ ] ✅ Health check returns success
- [ ] ✅ No errors in logs

---

## Frontend Deployment (Vercel)

### Step 1: Create Vercel Project

- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Click "Add New" → "Project"
- [ ] Import your GitHub repository
- [ ] Select Framework: `React`
- [ ] Set Root Directory: `client`
- [ ] Vercel auto-detects build settings

### Step 2: Add Environment Variables

In Project Settings → Environment Variables:

```
VITE_API_URL=https://your-service.onrender.com
VITE_SUPABASE_URL=<your_supabase_url>
VITE_SUPABASE_ANON_KEY=<your_supabase_anon_key>
```

- [ ] Add all environment variables
- [ ] Make sure `VITE_API_URL` points to your Render backend

### Step 3: Deploy

- [ ] Click "Deploy"
- [ ] Wait for deployment to complete (1-3 minutes)
- [ ] Check build logs
- [ ] Copy your frontend URL: `https://your-project.vercel.app`

### Step 4: Update Backend FRONTEND_URL

- [ ] Go back to Render dashboard
- [ ] Update `FRONTEND_URL` environment variable with your Vercel URL
- [ ] Click "Save"
- [ ] Render will redeploy automatically

### Frontend Deployment Verification

- [ ] ✅ Vercel shows "Ready" status
- [ ] ✅ Frontend loads without errors
- [ ] ✅ All pages accessible
- [ ] ✅ Console has no errors

---

## Post-Deployment Testing

### Backend Testing

```bash
# Health check
curl https://your-backend.onrender.com/

# Test CORS
curl -X OPTIONS https://your-backend.onrender.com/ \
  -H "Origin: https://your-frontend.vercel.app" \
  -H "Access-Control-Request-Method: POST"
```

### Frontend Testing

- [ ] Load home page at `https://your-frontend.vercel.app`
- [ ] Navigate to all pages (no 404s)
- [ ] Check browser console for errors
- [ ] Verify DevTools Network tab - API calls succeed
- [ ] Test Supabase login/signup
- [ ] Test AI resume generation
- [ ] Test ATS checker
- [ ] Test export to PDF
- [ ] Test mobile responsiveness

### Integration Testing

- [ ] Resume form submission succeeds
- [ ] AI summaries are generated
- [ ] Supabase saves resume data
- [ ] PDF download works
- [ ] Dark/light mode toggle works

---

## Troubleshooting

### Backend Issues

| Issue           | Solution                                                              |
| --------------- | --------------------------------------------------------------------- |
| Build fails     | Check Render logs for errors, verify `server/` folder exists          |
| Service crashes | Check environment variables are set, verify `npm start` works locally |
| 503 errors      | Backend might be sleeping (free tier), wait 10-30 seconds             |
| CORS errors     | Verify `FRONTEND_URL` is correct in env vars                          |

### Frontend Issues

| Issue          | Solution                                                                        |
| -------------- | ------------------------------------------------------------------------------- |
| Build fails    | Check Vercel logs, verify `client/` folder exists, test `npm run build` locally |
| Blank page     | Check browser console, verify `VITE_API_URL` is correct                         |
| API calls fail | Verify backend is running, check `VITE_API_URL` matches Render URL              |
| 404 on routes  | Vercel routing is configured in `client/vercel.json`                            |

### Supabase Issues

| Issue                 | Solution                                             |
| --------------------- | ---------------------------------------------------- |
| Auth fails            | Verify URL and ANON_KEY in both frontend and backend |
| Database queries fail | Check RLS policies in Supabase dashboard             |

---

## Maintenance

### Updates & Redeployment

```bash
# Make changes locally
git add .
git commit -m "Your changes"
git push origin main

# Render and Vercel auto-deploy
```

### Monitoring

- Check Render logs: Dashboard → Logs
- Check Vercel logs: Dashboard → Deployments
- Monitor API usage in OpenAI dashboard
- Check Supabase usage in dashboard

### Environment Variable Updates

- Edit in Render Dashboard → Environment for backend
- Edit in Vercel Project Settings for frontend
- Services will redeploy automatically

---

## Final Verification

- [ ] Backend service is Live on Render
- [ ] Frontend is Ready on Vercel
- [ ] Health check returns success
- [ ] Frontend loads without errors
- [ ] API calls work from frontend to backend
- [ ] Supabase authentication works
- [ ] OpenAI features work
- [ ] PDF export works
- [ ] All tests pass
- [ ] Mobile view is responsive

---

## Helpful Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Troubleshooting**: See [DEPLOYMENT.md](./DEPLOYMENT.md#-troubleshooting)

---

**🎉 Deployment Complete!**

Your app is now live and accessible to the world. Bookmark these URLs:

- **Backend**: https://your-service.onrender.com
- **Frontend**: https://your-project.vercel.app

Happy building! 🚀
