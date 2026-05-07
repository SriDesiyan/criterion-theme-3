# Deployment Guide

## Architecture Overview
This is a **TanStack Start full-stack application** with:
- Frontend: React + TanStack Router (SPA with SSR)
- Backend: Server-side rendering + API routes
- Runtime: Originally configured for Cloudflare Workers

## Deployment Options

### 🟢 **Option 1: Vercel (Recommended)**
**Best for:** Full-stack apps with serverless functions

#### Setup:
1. **Push to GitHub** (already done ✓)
2. **Connect to Vercel:**
   - Go to https://vercel.com/new
   - Select your GitHub repository
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: (auto-detected)

3. **Deploy:**
   - Vercel auto-builds and deploys on every push to `main`

#### Environment Variables:
- No special config needed for basic deployment

---

### 🟢 **Option 2: Cloudflare Pages (Current Config)**
**Best for:** Workers, edge computing, extremely fast global CDN

#### Setup:
1. **Install Wrangler (one-time):**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare:**
   ```bash
   wrangler login
   ```

3. **Deploy:**
   ```bash
   wrangler deploy
   ```

#### Automatic (CI/CD):
- Connect GitHub to Cloudflare Pages
- Auto-deploy on push

---

### ❌ **Option 3: GitHub Pages (Not Recommended)**
**Limitation:** No backend/server support

This won't work without significant refactoring because:
- GitHub Pages is **static-only**
- Your app requires **server-side rendering**
- Routing will break (the 404 error you're seeing)

**If you must use GitHub Pages:**
- You'd need to convert to a pure client-side SPA
- Disable SSR
- Lose server benefits
- Not recommended

---

## Common Issues & Fixes

### "404 File not found" on deploy
**Cause:** App deployed as static site without server
**Fix:** Use Vercel or Cloudflare (Options 1 or 2 above)

### Build fails with "node_modules" errors
**Fix:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routes work locally but not on Vercel
**Cause:** SPA routing not configured
**Fix:** Ensure `vite.config.ts` has TanStack Start configured (✓ already done)

---

## Recommended Deployment Flow

1. **Development:** `npm run dev`
2. **Test build locally:** `npm run build && npm run preview`
3. **Push to GitHub:** `git push origin main`
4. **Vercel auto-deploys** (if connected)

---

## Tech Stack Summary
- **Framework:** TanStack Start (full-stack React)
- **Build:** Vite
- **Styling:** Tailwind CSS
- **Package Manager:** npm
- **Original target:** Cloudflare Workers
