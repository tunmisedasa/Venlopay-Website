# 🚀 Deploy Venlopay to Netlify

## Quick Deploy Steps

### 1. Prepare Your Repository
```bash
# Make sure everything is committed
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### 2. Deploy to Netlify

#### Option A: Drag & Drop (Fastest)
1. **Build the project**:
   ```bash
   npm run build
   ```
2. **Go to [Netlify](https://netlify.com)**
3. **Drag the `dist` folder** to Netlify's deploy area
4. **Your site is live!** (with a random URL)

#### Option B: Git Integration (Recommended)
1. **Go to [Netlify](https://netlify.com)**
2. **Click "New site from Git"**
3. **Connect your GitHub repository**
4. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. **Deploy site**

### 3. Configure Custom Domain

1. **In Netlify Dashboard**:
   - Go to Site Settings → Domain Management
   - Click "Add custom domain"
   - Enter: `www.venlopay.com`

2. **Update DNS Records** (at your domain registrar):
   ```
   Type: CNAME
   Name: www
   Value: [your-netlify-subdomain].netlify.app
   
   Type: A (for apex domain)
   Name: @
   Value: 75.2.60.5
   ```

3. **Enable HTTPS**:
   - Netlify will automatically provision SSL certificate
   - Force HTTPS redirect in settings

### 4. Configure Web3Forms for Production

1. **Login to [Web3Forms Dashboard](https://web3forms.com/dashboard)**
2. **Add your domain**: `venlopay.com` and `www.venlopay.com`
3. **Verify domain ownership** if required

### 5. Test Everything

After deployment, test:
- [ ] Website loads correctly
- [ ] Waitlist signup works
- [ ] User confirmation emails are sent
- [ ] Admin notification emails are received
- [ ] Referral links work
- [ ] Mobile responsiveness

## 🔧 Environment Variables (if needed)

If you want to use environment variables:

1. **In Netlify Dashboard**:
   - Go to Site Settings → Environment Variables
   - Add variables:
     ```
     VITE_WEB3FORMS_KEY=4512abe2-60cc-4364-94fd-7273e9f4022b
     VITE_ADMIN_EMAIL=emmanuelogheneovo17@gmail.com
     ```

2. **Update your code** to use `import.meta.env.VITE_*` variables

## 🚨 Troubleshooting

### Common Issues:

1. **Build fails**:
   - Check Node.js version (use Node 18+)
   - Run `npm install` and `npm run build` locally first

2. **Emails not working**:
   - Verify Web3Forms domain configuration
   - Check browser console for errors
   - Test with the test pages first

3. **Referral links broken**:
   - Ensure routing is configured for SPA
   - Add `_redirects` file if needed

### Netlify SPA Configuration

Create `Venlopay-Website/public/_redirects`:
```
/*    /index.html   200
```

This ensures referral links like `/ref/abc123` work correctly.

## 📊 Post-Deployment Checklist

- [ ] **Test all functionality**
- [ ] **Set up Google Analytics** (optional)
- [ ] **Submit to Google Search Console**
- [ ] **Create social media accounts**
- [ ] **Announce the launch!** 🎉

## 🎯 Your Live URLs

After deployment:
- **Main site**: https://www.venlopay.com
- **Referral example**: https://www.venlopay.com/ref/user1234
- **Test pages**: 
  - https://www.venlopay.com/test-email.html
  - https://www.venlopay.com/test-dual-emails.html

**Ready to launch! 🚀**