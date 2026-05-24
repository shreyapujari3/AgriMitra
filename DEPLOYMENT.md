# AgriMitra Deployment Guide

## Overview
This guide covers deploying AgriMitra to production using:
- **Frontend**: Vercel (free tier)
- **Backend**: Render (free tier)  
- **Database**: Supabase (free tier)

## Prerequisites
- GitHub account with the code pushed
- Vercel account
- Render account
- Supabase project with schema.sql executed

## Step 1: Database Setup (Supabase)

1. Create account at [supabase.com](https://supabase.com)
2. Create new project with strong password
3. Wait for project initialization
4. Go to SQL Editor
5. Paste entire contents of `supabase/schema.sql`
6. Execute all queries
7. Verify tables created in Database > Tables
8. Copy from Settings > API:
   - Project URL
   - anon public key

Save these credentials securely!

## Step 2: Deploy Backend (Render)

### 2.1 Prepare Backend

```bash
# Ensure server/.env.example exists with:
# SUPABASE_URL
# SUPABASE_KEY
# PLANT_ID_API_KEY
# PORT=5000
```

### 2.2 Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2.3 Deploy on Render

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" > "Web Service"
4. Connect GitHub repository
5. Configure:
   - **Name**: agrimitra-server
   - **Environment**: Node
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Instance Type**: Free

6. Set Environment Variables:
   - `SUPABASE_URL`: Your Supabase URL
   - `SUPABASE_KEY`: Your Supabase anon key
   - `PLANT_ID_API_KEY`: Your Plant.id API key
   - `NODE_ENV`: production
   - `CLIENT_URL`: Your frontend URL (will set after frontend deployment)
   - `PORT`: 5000

7. Click "Create Web Service"
8. Wait for deployment (5-10 minutes)
9. Copy your Render backend URL (e.g., `https://agrimitra-server.onrender.com`)

### Backend URL
Backend will be available at: `https://agrimitra-server.onrender.com`

## Step 3: Deploy Frontend (Vercel)

### 3.1 Prepare Frontend

Create `client/.env.production`:
```
VITE_API_BASE_URL=https://agrimitra-server.onrender.com
```

### 3.2 Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New..." > "Project"
4. Import your GitHub repository
5. Configure:
   - **Framework**: Vite
   - **Root Directory**: client
   - **Build Command**: `npm run build`
   - **Output Directory**: dist
   - **Install Command**: `npm install`

6. Add Environment Variables:
   - `VITE_API_BASE_URL`: `https://agrimitra-server.onrender.com`

7. Click "Deploy"
8. Wait for deployment (2-3 minutes)
9. Your site will be live at Vercel's URL

### Frontend URL
Frontend will be available at: `https://agrimitra.vercel.app` (or custom domain)

## Step 4: Update Backend CORS (Important!)

After frontend deployment:

1. Go to Render dashboard
2. Click on agrimitra-server
3. Go to Environment
4. Update `CLIENT_URL` to your Vercel URL
5. Save and redeploy

## Step 5: Test Deployment

### Test Backend
```bash
curl https://agrimitra-server.onrender.com/health
```

Should return: `{"status":"Server is running",...}`

### Test Frontend
Visit your Vercel URL and:
1. Load home page
2. Try uploading an image
3. Check if API calls work
4. Test language toggle

### Check Logs
- **Vercel Logs**: Vercel Dashboard > Deployments > Logs
- **Render Logs**: Render Dashboard > agrimitra-server > Logs

## Monitoring & Maintenance

### Set Up Alerts
- Render: Enable auto-redeploy on GitHub push
- Vercel: Enable auto-deploy on git push

### Monitor Performance
- Vercel Analytics: Check Core Web Vitals
- Render: Check CPU, memory usage

### Database Backup
- Supabase automatically backs up data
- Export database weekly as CSV from Supabase

### Update API Keys
- Rotate PLANT_ID_API_KEY quarterly
- Update Supabase password every 3 months

## Scaling Up

### When Free Tier Isn't Enough

#### Frontend Scaling (Vercel)
- Pro plan: $20/month (better performance, priority support)
- Increase edge functions, analytics

#### Backend Scaling (Render)
- Standard plan: $7/month per dyno
- Upgrade to standard for better uptime
- Add database backups

#### Database Scaling (Supabase)
- Pro plan: $25/month (100GB storage, better performance)
- Add read replicas for scaling

## Troubleshooting Deployment

### Blank Page After Deployment
```
Solution:
1. Check Vercel deployment logs
2. Verify VITE_API_BASE_URL is correct
3. Check browser console for errors
4. Clear browser cache
```

### API 503 Error
```
Solution:
1. Render free tier goes to sleep after 15 min inactivity
2. Wait 30 seconds for Render to wake up
3. Upgrade to Standard plan for continuous running
```

### CORS Errors
```
Solution:
1. Verify CLIENT_URL in Render environment
2. Check that backend CORS configuration includes your frontend URL
3. Redeploy backend after changing environment variables
```

### Image Upload Failing
```
Solution:
1. File size must be < 5MB
2. Must be image format (JPEG, PNG, GIF, WebP)
3. Check server uploads directory has write permissions
```

### Database Connection Error
```
Solution:
1. Verify SUPABASE_URL is correct
2. Verify SUPABASE_KEY hasn't expired
3. Check network connectivity from Render to Supabase
4. Try resetting connection pool in Supabase
```

## Custom Domain Setup

### Add Domain to Vercel
1. Vercel Dashboard > Project > Settings > Domains
2. Add your domain
3. Follow DNS configuration steps
4. Update CLIENT_URL in Render accordingly

### Add Domain to Render
1. Render Dashboard > Web Service > Settings > Custom Domain
2. Add domain
3. Follow DNS instructions

## Security Checklist

- [ ] Environment variables set in production
- [ ] Never commit .env files
- [ ] Use strong Supabase passwords
- [ ] Enable 2FA on Vercel and Render
- [ ] Regularly update dependencies
- [ ] Monitor API logs for suspicious activity
- [ ] Set up rate limiting for API endpoints
- [ ] Use HTTPS everywhere (automatic)
- [ ] Keep API keys secret and rotated

## Performance Optimization

### Frontend
- Images are optimized by Vercel
- CSS is minified in production
- JavaScript is bundled and tree-shaken
- Use Vercel Analytics for monitoring

### Backend
- Database queries are optimized with indexes
- Static data is cached
- Enable gzip compression (default in Express)
- Monitor response times

### Database
- Use appropriate indexes on frequently queried columns
- Archive old detection_logs periodically
- Optimize queries with EXPLAIN ANALYZE

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Plant.id API**: https://www.plant.id/api

---

**Deployment Checklist**
- [ ] Database schema created in Supabase
- [ ] Backend deployed to Render with all env vars
- [ ] Frontend deployed to Vercel with correct API URL
- [ ] CORS configured correctly
- [ ] All features tested in production
- [ ] Monitoring and alerts set up
- [ ] Custom domain configured (optional)

You're all set! 🚀
