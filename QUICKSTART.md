# AgriMitra - Quick Start Guide

## Installation Steps

### 1. Prerequisites
- Node.js v16+
- npm or yarn
- Git
- A code editor (VS Code recommended)

### 2. Clone Repository
```bash
git clone https://github.com/yourusername/agrimitra.git
cd agrimitra
```

### 3. Setup Supabase Database

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. In the SQL editor, run the contents of `supabase/schema.sql`
4. Copy your project URL and anon key from settings

### 4. Setup Backend

```bash
cd server

# Copy example env
cp .env.example .env

# Edit .env file with your Supabase credentials
# Get Plant.id API key from https://www.plant.id/api (free tier)

# Install and run
npm install
npm run dev
```

Server will run on `http://localhost:5000`

### 5. Setup Frontend

```bash
cd ../client

# Copy example env
cp .env.example .env

# Install and run
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

### 6. Open in Browser
Visit `http://localhost:5173`

## Features to Try

1. **Home Page** - Explore the app
2. **Detect Disease** - Try uploading an image
   - Select Coffee, Pepper, Sugarcane, or Areca Nut
   - Upload any plant image (from Google Images for demo)
   - View disease detection and treatment
3. **Dashboard** - View crop-specific tips
4. **Stores** - Find nearby agri stores by district
5. **Experts** - Contact agricultural experts
6. **Tips** - View seasonal prevention tips
7. **Language Toggle** - Switch between EN, Hindi, Kannada

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti :5000 | xargs kill -9

# Or use different port
PORT=5001 npm run dev
```

### API Connection Error
- Check if backend server is running on port 5000
- Verify Supabase URL and key in .env
- Check CORS settings in server/app.js

### Image Upload Not Working
- Ensure `server/uploads/` directory exists
- Check file size (max 5MB)
- Verify MIME types (JPEG, PNG, GIF, WebP)

### Translations Not Updating
- Hard refresh browser (Ctrl+Shift+R)
- Clear localStorage: `localStorage.clear()`

## Production Deployment

### Deploy Frontend (Vercel)
```bash
cd client
npm run build
# Follow Vercel deployment steps
```

### Deploy Backend (Render)
```bash
# Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# Connect GitHub repo to Render
# Set environment variables
# Deploy
```

## Database Credentials
Save your Supabase credentials securely:
- Project URL: `https://xxx.supabase.co`
- Anon Key: `xxxxxxx`

Never commit `.env` files!

## Support
- Check README.md for detailed documentation
- Review console logs for errors
- Check backend logs for API issues

Happy Farming! 🌾
