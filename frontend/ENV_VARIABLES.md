# Environment Variables for Vercel Deployment

This document lists all environment variables required for deploying the UrbanBuddy frontend to Vercel.

## 📋 Required Environment Variables

You **MUST** set these in Vercel Dashboard → Settings → Environment Variables:

### 1. `NEXT_PUBLIC_API_URL` ⚠️ REQUIRED

**Description:** The URL of your backend API server.

**Format:** `https://your-backend-url.com/api`

**Examples:**
- Production: `https://urbanbuddy-backend.onrender.com/api`
- Production: `https://api.urbanbuddy.com/api`
- Local (dev only): `http://localhost:8000/api`

**Where it's used:**
- `frontend/lib/api.ts` - All API calls to your backend

**Important:** 
- Must start with `https://` for production
- Must include `/api` at the end if your backend routes are prefixed with `/api`
- The `NEXT_PUBLIC_` prefix makes it available in the browser

---

### 2. `NEXTAUTH_URL` ⚠️ REQUIRED

**Description:** The canonical URL of your site (your Vercel deployment URL).

**Format:** `https://your-app.vercel.app`

**Examples:**
- Vercel default: `https://urbanbuddy.vercel.app`
- Custom domain: `https://www.urbanbuddy.com`
- Local (dev only): `http://localhost:3000`

**Where it's used:**
- NextAuth configuration for OAuth callbacks
- Session management

**Important:**
- Set this to your **actual Vercel deployment URL** after first deployment
- If using a custom domain, update this to your custom domain
- Must use `https://` for production

---

### 3. `NEXTAUTH_SECRET` ⚠️ REQUIRED

**Description:** A secret key used to encrypt JWT tokens and sessions.

**Format:** Random string (32+ characters recommended)

**How to generate:**
```bash
# Using OpenSSL
openssl rand -base64 32

# Or use online generator
# Visit: https://generate-secret.vercel.app/32
```

**Example:**
```
NEXTAUTH_SECRET=abc123xyz789randomsecretkey456def789ghi012jkl345mno678pqr
```

**Where it's used:**
- NextAuth session encryption
- JWT token signing

**Important:**
- **NEVER** commit this to git
- Use a **different secret** for production than development
- Keep it secure and don't share it publicly
- Minimum 32 characters recommended

---

## 🔧 Setting Environment Variables in Vercel

### Method 1: Via Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click **Settings** → **Environment Variables**
4. Click **Add New**
5. Enter:
   - **Key:** Variable name (e.g., `NEXT_PUBLIC_API_URL`)
   - **Value:** Variable value (e.g., `https://your-backend.com/api`)
   - **Environment:** Select `Production`, `Preview`, and/or `Development`
6. Click **Save**
7. **Redeploy** your application

### Method 2: Via Vercel CLI

```bash
# Set environment variable
vercel env add NEXT_PUBLIC_API_URL production

# Or add to all environments
vercel env add NEXT_PUBLIC_API_URL
```

---

## 📝 Environment-Specific Values

### Production Environment

```env
NEXT_PUBLIC_API_URL=https://your-backend-production.com/api
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=<generate-a-strong-random-secret>
```

### Preview Environment (Pull Requests)

```env
NEXT_PUBLIC_API_URL=https://your-backend-production.com/api
NEXTAUTH_URL=https://your-preview-branch.vercel.app
NEXTAUTH_SECRET=<can-use-same-as-production-or-different>
```

### Development Environment (Local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dev-secret-key-change-in-production
```

---

## ✅ Verification Checklist

After setting environment variables:

- [ ] All 3 required variables are set
- [ ] `NEXT_PUBLIC_API_URL` points to your deployed backend
- [ ] `NEXTAUTH_URL` matches your Vercel deployment URL
- [ ] `NEXTAUTH_SECRET` is a strong random string (32+ chars)
- [ ] Variables are set for the correct environments (Production/Preview)
- [ ] Application has been redeployed after adding variables

---

## 🐛 Troubleshooting

### "API calls failing"
- ✅ Check `NEXT_PUBLIC_API_URL` is correct
- ✅ Verify backend is accessible from browser
- ✅ Check CORS settings on backend allow your Vercel domain

### "Authentication not working"
- ✅ Verify `NEXTAUTH_URL` matches your deployment URL exactly
- ✅ Check `NEXTAUTH_SECRET` is set
- ✅ Ensure you redeployed after adding variables

### "Environment variables not working"
- ✅ Variables must be set **before** deployment
- ✅ Redeploy after adding/changing variables
- ✅ Check variable names are exact (case-sensitive)
- ✅ `NEXT_PUBLIC_*` variables are available in browser
- ✅ Variables without `NEXT_PUBLIC_` are server-only

---

## 🔐 Security Best Practices

1. **Never commit secrets to git**
   - Use `.env.local` for local development (already in `.gitignore`)
   - Use Vercel Dashboard for production secrets

2. **Use different secrets for different environments**
   - Production should have a unique `NEXTAUTH_SECRET`
   - Don't reuse development secrets

3. **Rotate secrets periodically**
   - If a secret is compromised, generate a new one
   - Update in Vercel and redeploy

4. **Limit access**
   - Only team members who need access should see environment variables
   - Use Vercel team permissions to control access

---

## 📚 Additional Resources

- [Vercel Environment Variables Docs](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [NextAuth Configuration](https://next-auth.js.org/configuration/options)

