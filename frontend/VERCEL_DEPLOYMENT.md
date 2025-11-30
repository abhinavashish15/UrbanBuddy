# Vercel Deployment Guide for UrbanBuddy Frontend

This guide will help you deploy the UrbanBuddy frontend to Vercel.

## 🚀 Quick Deploy (Recommended)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
   - Sign in or create an account
   - Click "Add New Project"
   - Import your repository
   - Select the `frontend` folder as the root directory

3. **Configure Project Settings:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)

4. **Add Environment Variables:**
   Click "Environment Variables" and add:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
   NEXTAUTH_URL=https://your-vercel-app.vercel.app
   NEXTAUTH_SECRET=your-secret-key-here-generate-a-random-string
   ```

5. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-app.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

3. **Login to Vercel:**
   ```bash
   vercel login
   ```

4. **Deploy:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Select your project settings
   - Add environment variables when prompted

5. **For production deployment:**
   ```bash
   vercel --prod
   ```

## 🔧 Environment Variables

You **MUST** set these environment variables in Vercel:

### Required Variables:

1. **NEXT_PUBLIC_API_URL**
   - Your backend API URL
   - Example: `https://your-backend.onrender.com/api`
   - Or: `https://api.yourdomain.com/api`

2. **NEXTAUTH_URL**
   - Your Vercel deployment URL
   - Example: `https://your-app.vercel.app`
   - Vercel will provide this after first deployment

3. **NEXTAUTH_SECRET**
   - A random secret string for NextAuth
   - Generate one using:
     ```bash
     openssl rand -base64 32
     ```
   - Or use: [generate-secret.vercel.app](https://generate-secret.vercel.app/32)

### Optional Variables (if needed):

- `NODE_ENV=production`
- Any other environment variables your app uses

## 📝 Setting Environment Variables in Vercel

1. Go to your project in Vercel Dashboard
2. Click on **Settings** → **Environment Variables**
3. Add each variable:
   - **Key:** Variable name (e.g., `NEXT_PUBLIC_API_URL`)
   - **Value:** Variable value (e.g., `https://your-backend.com/api`)
   - **Environment:** Select `Production`, `Preview`, and/or `Development`
4. Click **Save**
5. **Redeploy** your application for changes to take effect

## 🔄 Updating Your Deployment

### Automatic Deployments:
- Vercel automatically deploys when you push to your main branch
- Preview deployments are created for pull requests

### Manual Deployment:
```bash
cd frontend
vercel --prod
```

## 🌐 Custom Domain Setup

1. Go to your project in Vercel Dashboard
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions
5. Update `NEXTAUTH_URL` to your custom domain

## ⚙️ Build Configuration

The project is configured with:
- **Framework:** Next.js 14
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Node Version:** Auto-detected (recommended: 18.x or 20.x)

## 🔍 Troubleshooting

### Build Fails

1. **Check build logs** in Vercel Dashboard
2. **Common issues:**
   - Missing environment variables
   - TypeScript errors
   - Missing dependencies
   - Build timeout (increase in settings)

### API Connection Issues

1. **Verify `NEXT_PUBLIC_API_URL`** is set correctly
2. **Check CORS settings** on your backend
3. **Ensure backend is deployed** and accessible
4. **Check browser console** for CORS errors

### Authentication Issues

1. **Verify `NEXTAUTH_URL`** matches your deployment URL
2. **Check `NEXTAUTH_SECRET`** is set
3. **Ensure backend auth endpoints** are working

### Environment Variables Not Working

1. **Redeploy** after adding variables
2. **Check variable names** (case-sensitive)
3. **Verify environment** (Production/Preview/Development)
4. **Restart deployment** if needed

## 📊 Monitoring

- **Analytics:** Enable in Vercel Dashboard → Analytics
- **Logs:** View in Vercel Dashboard → Deployments → [Select Deployment] → Logs
- **Performance:** Check Vercel Analytics for Core Web Vitals

## 🔐 Security Best Practices

1. **Never commit** `.env.local` files
2. **Use strong secrets** for `NEXTAUTH_SECRET`
3. **Enable HTTPS** (automatic on Vercel)
4. **Set up proper CORS** on backend
5. **Use environment-specific** variables

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)

## ✅ Post-Deployment Checklist

- [ ] All environment variables are set
- [ ] Backend API is accessible from frontend
- [ ] Authentication is working
- [ ] All pages load correctly
- [ ] API calls are successful
- [ ] Custom domain is configured (if applicable)
- [ ] Analytics are enabled (optional)
- [ ] Error monitoring is set up (optional)

---

**Need Help?** Check Vercel's [Support Documentation](https://vercel.com/support) or [Community Forum](https://github.com/vercel/vercel/discussions).

