# 🚀 Deploy Venlopay to Vercel

## Quick Deploy Steps

### 1. Prepare Your Repository
```bash
# Make sure everything is committed
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Vercel CLI (Fastest)
```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: venlopay-website
# - Directory: ./
# - Override settings? No

# Deploy to production
vercel --prod
```

#### Option B: Vercel Dashboard (Recommended)
1. **Go to [Vercel.com](https://vercel.com)**
2. **Click "New Project"**
3. **Import your Git repository**
4. **Configure project**:
   - Framework Preset: Vite
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Click "Deploy"**

### 3. Configure Custom Domain

1. **In Vercel Dashboard**:
   - Go to Project Settings → Domains
   - Click "Add Domain"
   - Enter: `www.venlopay.com`
   - Also add: `venlopay.com` (apex domain)

2. **Update DNS Records** (at your domain registrar):
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A (for apex domain)
   Name: @
   Value: 76.76.19.61
   
   Type: AAAA (IPv6, optional)
   Name: @
   Value: 2606:4700:10::6816:133d
   ```

3. **SSL Certificate**:
   - Vercel automatically provisions SSL certificates
   - HTTPS will be enabled automatically

### 4. Configure Vercel for SPA Routing

Create `Venlopay-Website/vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures referral links like `/ref/abc123` work correctly.

### 5. Environment Variables (Optional)

If you want to use environment variables:

1. **In Vercel Dashboard**:
   - Go to Project Settings → Environment Variables
   - Add variables:
     ```
     VITE_WEB3FORMS_KEY=4512abe2-60cc-4364-94fd-7273e9f4022b
     VITE_ADMIN_EMAIL=emmanuelogheneovo17@gmail.com
     VITE_DOMAIN=https://www.venlopay.com
     ```

2. **Redeploy** after adding environment variables

### 6. Configure Web3Forms for Production

1. **Login to [Web3Forms Dashboard](https://web3forms.com/dashboard)**
2. **Add your domains**: 
   - `venlopay.com`
   - `www.venlopay.com`
   - `*.vercel.app` (for preview deployments)
3. **Verify domain ownership** if required

### 7. Test Everything

After deployment, test:
- [ ] Website loads correctly at your domain
- [ ] Waitlist signup works
- [ ] User confirmation emails are sent
- [ ] Admin notification emails are received
- [ ] Referral links work (e.g., `/ref/test123`)
- [ ] Mobile responsiveness
- [ ] All pages load correctly

## 🔧 Vercel Configuration Files

### vercel.json (already created)
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

## 🚨 Troubleshooting

### Common Issues:

1. **Build fails**:
   ```bash
   # Test build locally first
   npm run build
   npm run preview
   ```

2. **Routing issues**:
   - Ensure `vercel.json` is in project root
   - Check that rewrites are configured correctly

3. **Emails not working**:
   - Verify Web3Forms domain configuration
   - Check browser console for CORS errors
   - Test with the test pages first

4. **Domain not working**:
   - DNS propagation can take up to 48 hours
   - Use [DNS Checker](https://dnschecker.org) to verify
   - Ensure CNAME points to `cname.vercel-dns.com`

## 📊 Vercel Features You Get

- ✅ **Automatic HTTPS** with SSL certificates
- ✅ **Global CDN** for fast loading worldwide
- ✅ **Preview deployments** for every Git push
- ✅ **Analytics** (available in dashboard)
- ✅ **Edge functions** (if needed later)
- ✅ **Automatic deployments** from Git

## 🎯 Your Live URLs

After deployment:
- **Main site**: https://www.venlopay.com
- **Apex domain**: https://venlopay.com (redirects to www)
- **Referral example**: https://www.venlopay.com/ref/user1234
- **Test pages**: 
  - https://www.venlopay.com/test-email.html
  - https://www.venlopay.com/test-dual-emails.html

## 📈 Post-Deployment Optimization

### Performance
- Vercel automatically optimizes images
- Enable Analytics in Vercel dashboard
- Monitor Core Web Vitals

### SEO
- Add `sitemap.xml` to public folder
- Configure `robots.txt`
- Set up Google Search Console

### Monitoring
- Use Vercel Analytics
- Set up error tracking (Sentry, etc.)
- Monitor email delivery rates

## 🎉 Launch Checklist

- [ ] **Deploy to Vercel**
- [ ] **Configure custom domain**
- [ ] **Update Web3Forms domains**
- [ ] **Test all functionality**
- [ ] **Set up analytics** (optional)
- [ ] **Announce the launch!**

**Ready to launch on Vercel! 🚀**

## Quick Commands Summary

```bash
# Deploy to Vercel
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs [deployment-url]
```