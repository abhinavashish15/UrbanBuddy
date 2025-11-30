# Render Deployment Guide for UrbanBuddy Backend

This guide will help you deploy the UrbanBuddy backend to Render.

## Prerequisites

1. A Render account (sign up at https://render.com)
2. A MongoDB database (you can use MongoDB Atlas or Render's MongoDB service)
3. Your frontend URL for CORS configuration

## Deployment Steps

### Option 1: Using Render Blueprint (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   - Make sure your `backend` folder is in the repository
   - The `render.yaml` file should be in the `backend` directory

2. **Connect Repository to Render**
   - Go to Render Dashboard → New → Blueprint
   - Connect your repository
   - Render will automatically detect the `render.yaml` file

3. **Configure Environment Variables**
   - In the Render dashboard, go to your service → Environment
   - Set the following environment variables:
     - `DATABASE_URL`: Your MongoDB connection string
     - `FRONTEND_URL`: Your frontend URL (e.g., `https://your-frontend.onrender.com` or your custom domain)
     - `JWT_SECRET`: A strong random string (Render can generate this automatically)
     - `JWT_EXPIRES_IN`: Token expiration (default: `7d`)
     - `MAX_FILE_SIZE`: Maximum file upload size in bytes (default: `5242880` = 5MB)
     - `UPLOAD_PATH`: Path for file uploads (default: `./uploads`)

4. **Deploy**
   - Render will automatically build and deploy your service
   - The service will be available at `https://your-service-name.onrender.com`

### Option 2: Manual Deployment

1. **Create a Web Service**
   - Go to Render Dashboard → New → Web Service
   - Connect your repository
   - Set the following:
     - **Name**: `urbanbuddy-backend`
     - **Environment**: `Node`
     - **Root Directory**: `backend`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`

2. **Set Environment Variables**
   - Go to Environment tab
   - Add all the environment variables listed above

3. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy your service

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | Yes | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `FRONTEND_URL` | Yes | Frontend URL for CORS | `https://your-frontend.onrender.com` |
| `JWT_SECRET` | Yes | Secret key for JWT tokens | Generate a strong random string |
| `JWT_EXPIRES_IN` | No | JWT token expiration | `7d` (default) |
| `MAX_FILE_SIZE` | No | Max file upload size (bytes) | `5242880` (default: 5MB) |
| `UPLOAD_PATH` | No | Upload directory path | `./uploads` (default) |
| `NODE_ENV` | No | Node environment | `production` (auto-set by Render) |
| `PORT` | No | Server port | Auto-set by Render |

## MongoDB Setup

### Option A: MongoDB Atlas (Recommended)

1. **Create a free cluster** at https://www.mongodb.com/cloud/atlas
2. **Configure Network Access (CRITICAL for Render deployment)**
   - Go to MongoDB Atlas Dashboard → Network Access
   - Click "Add IP Address"
   - **For Render deployment, you have two options:**
     - **Option 1 (Recommended for Production)**: Add `0.0.0.0/0` to allow access from anywhere
       - This allows Render's dynamic IPs to connect
       - Your database is still protected by username/password authentication
     - **Option 2 (More Secure)**: Add specific Render IP ranges (check Render docs for current IPs)
   - Click "Confirm"
   - ⚠️ **IMPORTANT**: Without this step, your Render deployment will fail with connection errors!
3. **Get your connection string**
   - Go to Atlas Dashboard → Database → Connect
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Replace `<dbname>` with your database name (or remove it to use default)
4. **Add the connection string to Render**
   - In Render dashboard → Environment tab
   - Add `DATABASE_URL` with your MongoDB connection string

### Option B: Render MongoDB

1. Go to Render Dashboard → New → MongoDB
2. Create a new MongoDB instance
3. Copy the Internal Database URL
4. Add it to `DATABASE_URL` in Render

## Post-Deployment

1. **Test the Health Endpoint**
   - Visit `https://your-service.onrender.com/health`
   - Should return: `{"status":"ok","timestamp":"..."}`

2. **Update Frontend Configuration**
   - Update your frontend API URL to point to the Render backend URL
   - Example: `https://urbanbuddy-backend.onrender.com/api`

3. **Monitor Logs**
   - Check Render dashboard logs for any errors
   - Monitor database connections

## Troubleshooting

### Common Issues

1. **Database Connection Failed / IP Whitelist Error**
   - **This is the most common issue!**
   - Error message: "Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted."
   - **Solution:**
     1. Go to MongoDB Atlas Dashboard → Network Access
     2. Click "Add IP Address"
     3. Add `0.0.0.0/0` (allows all IPs - safe because authentication is still required)
     4. Click "Confirm"
     5. Wait 1-2 minutes for changes to propagate
     6. Redeploy your Render service
   - Verify `DATABASE_URL` format is correct: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`
   - Ensure password is URL-encoded if it contains special characters

2. **CORS Errors**
   - Verify `FRONTEND_URL` matches your frontend domain exactly
   - Include protocol (`https://`) in the URL

3. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are in `package.json`
   - Check build logs in Render dashboard

4. **Service Crashes**
   - Check application logs
   - Verify all required environment variables are set
   - Ensure database is accessible

## Notes

- Render free tier services spin down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- For production, consider upgrading to a paid plan for always-on service
- File uploads on Render free tier are ephemeral (files are lost on restart)
- Consider using cloud storage (AWS S3, Cloudinary) for persistent file storage

## Support

For Render-specific issues, check:
- Render Documentation: https://render.com/docs
- Render Status: https://status.render.com

