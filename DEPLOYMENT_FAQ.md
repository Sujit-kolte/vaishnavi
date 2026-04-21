# ❓ Deployment FAQ & Quick Reference

## Quick Answers

### Q: My backend won't start on Render

**A:**

1. Check Render logs (Dashboard → Logs)
2. Verify all environment variables are set
3. Test locally: `cd server && npm run dev`
4. Check if `server/index.js` exists
5. For free tier: Service goes to sleep, first request takes 30s

### Q: API calls return 404 from frontend

**A:**

1. Verify `VITE_API_URL` is set correctly in Vercel
2. Check it matches your Render backend URL exactly
3. Test in browser console:
   ```javascript
   fetch("https://your-backend.onrender.com/");
   ```
4. If 503: backend is sleeping, wait a moment and retry

### Q: Frontend shows blank page

**A:**

1. Open DevTools → Console and check for errors
2. Verify `VITE_API_URL` in Vercel environment variables
3. Test locally: `cd client && npm run dev`
4. Check Vercel build logs for errors

### Q: CORS errors in browser

**A:**

1. Verify backend `FRONTEND_URL` matches your Vercel URL exactly
2. Check `server/index.js` CORS configuration
3. Ensure it includes `https://` (not just domain)
4. Common typo: forgetting trailing slash or wrong URL

### Q: Supabase auth not working

**A:**

1. Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` match your project
2. Check they're set in both frontend AND backend
3. Ensure no typos in credentials
4. Verify your Supabase project is active

### Q: OpenAI API calls fail

**A:**

1. Verify `OPENAI_API_KEY` is correct
2. Check API key has sufficient credits
3. Verify it's set in backend environment variables
4. Test locally first: `cd server && npm run dev`

### Q: Vercel deployment stuck building

**A:**

1. Check build logs for errors
2. Verify `client/` folder exists and is correct
3. Test locally: `cd client && npm run build`
4. Cancel and redeploy if stuck > 10 minutes

### Q: Changes not showing after git push

**A:**

1. Verify git push succeeded (check GitHub)
2. Wait 1-2 minutes for auto-deploy to trigger
3. Check Render/Vercel deployment status
4. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
5. Check browser cache: DevTools → Application → Clear Storage

### Q: Resume not saving to database

**A:**

1. Check Supabase RLS policies on tables
2. Verify user is authenticated
3. Check browser console for error messages
4. Test Supabase connection with test query
5. Verify `SUPABASE_SERVICE_KEY` if doing admin operations

---

## Environment Variable Checklist

### Backend (Render)

```
✓ NODE_ENV = production
✓ PORT = 5000 (Render assigns automatically)
✓ FRONTEND_URL = https://your-vercel-app.vercel.app
✓ SUPABASE_URL = https://[project-id].supabase.co
✓ SUPABASE_ANON_KEY = eyJ... (from Supabase dashboard)
✓ OPENAI_API_KEY = sk-... (from OpenAI platform)
```

### Frontend (Vercel)

```
✓ VITE_API_URL = https://your-backend.onrender.com
✓ VITE_SUPABASE_URL = https://[project-id].supabase.co
✓ VITE_SUPABASE_ANON_KEY = eyJ... (from Supabase dashboard)
```

---

## Common Mistakes

### ❌ Mistake 1: Wrong FRONTEND_URL in backend

```
❌ FRONTEND_URL = your-frontend.vercel.app (missing https://)
✅ FRONTEND_URL = https://your-frontend.vercel.app
```

### ❌ Mistake 2: Hardcoded localhost in code

```
❌ const api = "http://localhost:5000"
✅ const api = import.meta.env.VITE_API_URL
```

### ❌ Mistake 3: Missing trailing slash in Supabase URL

```
❌ VITE_SUPABASE_URL = https://project.supabase.co
✅ VITE_SUPABASE_URL = https://project.supabase.co
```

### ❌ Mistake 4: Not updating CORS after Vercel URL changes

```
Render backend still points to old Vercel URL → CORS fails
Always update FRONTEND_URL when Vercel redeploys
```

### ❌ Mistake 5: Forgetting to set env vars in Render

```
Build succeeds but app crashes → Missing env vars
Double-check all vars are set in Render dashboard
```

---

## Testing Commands

### Test Backend Health

```bash
curl https://your-backend.onrender.com/
```

Expected: `{"message":"Smart Resume Builder Backend ✅","status":"operational"}`

### Test CORS

```bash
curl -i -X OPTIONS https://your-backend.onrender.com \
  -H "Origin: https://your-frontend.vercel.app"
```

Should include: `Access-Control-Allow-Origin: https://your-frontend.vercel.app`

### Test API Endpoint

```bash
curl https://your-backend.onrender.com/api/auth/register
```

Should return 200 or validation error (not 404)

### Test Frontend Network

Open browser DevTools → Network tab, refresh, check:

- No failed requests (red)
- API calls succeed (200 status)
- No CORS errors

---

## Useful Dashboard Links

- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Dashboard**: https://app.supabase.com
- **OpenAI Dashboard**: https://platform.openai.com

---

## Performance Tips

### Render Backend

- Free tier goes to sleep after 15 min inactivity
- First request after sleep: ~30 seconds
- Upgrade to paid for always-on performance
- Monitor logs for errors/bottlenecks

### Vercel Frontend

- Automatically optimizes build
- Check Analytics in dashboard
- Enable serverless function caching
- Use image optimization

### Database (Supabase)

- Monitor query count
- Enable connection pooling for better performance
- Check table indexes for slow queries
- Use appropriate RLS policies

---

## Deployment Success Signs

✅ Backend shows "Live" in Render dashboard  
✅ Frontend shows "Ready" in Vercel dashboard  
✅ Health check returns expected response  
✅ No 404 errors on routes  
✅ No CORS errors in console  
✅ Supabase queries work  
✅ OpenAI API calls work  
✅ PDF export works  
✅ Forms submit successfully  
✅ Mobile view is responsive

---

## Still Having Issues?

1. **Check logs**: Render Dashboard → Logs and Vercel Dashboard → Logs
2. **Test locally**: `npm run dev` in both client and server
3. **Verify credentials**: Double-check all env vars
4. **Clear cache**: Browser cache + Vercel cache
5. **Restart services**: Redeploy in both Render and Vercel
6. **Check docs**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
7. **Isolate problem**: Test each service independently

---

## Getting Help

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Express Docs**: https://expressjs.com
- **React Docs**: https://react.dev
- **Supabase Docs**: https://supabase.com/docs

Good luck! 🚀
