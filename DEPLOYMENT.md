# Deployment Guide

This guide covers deployment options for the MetalCraft website.

## Quick Start

### Option 1: Vercel (Recommended for Next.js)

1. **Push to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js and configure build settings
   - Add environment variables (see below)
   - Click "Deploy"

3. **Configure Domain** (Optional)
   - In Vercel dashboard, go to Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

### Option 2: Docker Deployment

1. **Build Docker Image**

   ```bash
   docker build -t metalcraft-web .
   ```

2. **Run Container**

   ```bash
   docker run -p 3000:3000 metalcraft-web
   ```

   Or use docker-compose:

   ```bash
   docker-compose up -d
   ```

3. **With Environment Variables**
   ```bash
   docker run -p 3000:3000 --env-file .env.local metalcraft-web
   ```

### Option 3: Manual Deployment

1. **Build the Application**

   ```bash
   npm install
   npm run build
   ```

2. **Start Production Server**

   ```bash
   npm start
   ```

3. **Use Process Manager** (e.g., PM2)
   ```bash
   npm install -g pm2
   pm2 start npm --name "metalcraft" -- start
   pm2 save
   pm2 startup
   ```

## Environment Variables

Copy `env.example` to `.env.local` and fill in the values:

```bash
cp env.example .env.local
```

### Required Variables

- None currently required for basic functionality

### Optional Variables

- `SMTP_*`: For contact form email functionality
- `NEXT_PUBLIC_GA_ID`: Google Analytics tracking ID
- `NEXT_PUBLIC_SENTRY_DSN`: Sentry error tracking
- `DATABASE_URL`: If you add a database later

## Platform-Specific Instructions

### Vercel

**Environment Variables:**

- Add in Vercel dashboard: Settings → Environment Variables
- Use `NEXT_PUBLIC_` prefix for client-side variables

**Build Settings:**

- Framework Preset: Next.js
- Build Command: `npm run build` (default)
- Output Directory: `.next` (default)

### Netlify

1. Build Command: `npm run build`
2. Publish Directory: `.next`
3. Functions Directory: (leave empty)

### Railway

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Add environment variables

### AWS / DigitalOcean / Self-Hosted

Use the Docker deployment method for consistency across platforms.

## Performance Optimizations

### CDN Configuration

- Images are automatically optimized by Next.js Image component
- Static assets served from `/_next/static` can be cached indefinitely
- Set appropriate cache headers in your CDN/proxy

### Caching Headers (Nginx example)

```nginx
location /_next/static/ {
    add_header Cache-Control "public, max-age=31536000, immutable";
}

location /images/ {
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```

## Monitoring & Error Tracking

### Sentry Setup (Optional)

1. Create account at [sentry.io](https://sentry.io)
2. Create new Next.js project
3. Copy DSN and add to environment variables:
   ```
   NEXT_PUBLIC_SENTRY_DSN=your-dsn-here
   ```

### Vercel Analytics

- Automatically enabled on Vercel platform
- View in Vercel dashboard

## Troubleshooting

### Build Failures

**Issue**: Module not found errors

- **Solution**: Run `npm install` to ensure all dependencies are installed

**Issue**: Type errors during build

- **Solution**: Run `npm run build` locally to catch TypeScript errors

### Runtime Errors

**Issue**: Images not loading

- **Solution**: Check image paths are correct and files exist in `public/images/`

**Issue**: Environment variables not working

- **Solution**: Ensure client-side variables use `NEXT_PUBLIC_` prefix

### Docker Issues

**Issue**: Container won't start

- **Solution**: Check logs with `docker logs <container-id>`

**Issue**: Port already in use

- **Solution**: Change port mapping `-p 3001:3000` or stop conflicting service

## Security Checklist

- [ ] Set strong environment variables for production
- [ ] Enable HTTPS (automatic on Vercel, configure for self-hosted)
- [ ] Set security headers (already configured in `next.config.mjs`)
- [ ] Keep dependencies updated (`npm audit` and `npm update`)
- [ ] Don't commit `.env.local` files to git

## Rollback

### Vercel

- Go to deployments tab
- Click on previous deployment
- Click "Promote to Production"

### Docker

```bash
docker tag metalcraft-web:latest metalcraft-web:backup
# Then redeploy previous version
```

## Support

For issues or questions:

1. Check this deployment guide
2. Review Next.js deployment docs: https://nextjs.org/docs/deployment
3. Check platform-specific documentation

## Next Steps

After deployment:

1. Test all functionality in production
2. Set up monitoring and error tracking
3. Configure custom domain
4. Enable analytics
5. Set up automated backups (if using database)
