# Netlify Continuous Deployment Quick Reference

This is a quick reference for managing your Familiespådommer 2026 app with Netlify's continuous deployment.

## 🚀 How Continuous Deployment Works

Your app is connected to GitHub. Every time you push code changes, Netlify automatically:
1. Detects the new commit
2. Runs `npm run build`
3. Deploys the new version
4. Makes it live at your URL

**No manual deployment needed!**

## 📝 Environment Variables (Set in Netlify, Not in Code)

All configuration is managed through Netlify's dashboard:

**Location:** Site settings → Environment variables

**Required Variables:**
```
NEXT_PUBLIC_FIREBASE_API_KEY          - From Firebase Console
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN      - From Firebase Console
NEXT_PUBLIC_FIREBASE_PROJECT_ID       - From Firebase Console
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET   - From Firebase Console
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID - From Firebase Console
NEXT_PUBLIC_FIREBASE_APP_ID           - From Firebase Console
NEXT_PUBLIC_SHARED_CODE               - Your family's password
```

## 🔄 Common Workflows

### Update Code
```bash
# Make your changes
git add .
git commit -m "Add new feature"
git push origin main
# Netlify deploys automatically in 2-5 minutes
```

### Change Environment Variable
1. Netlify Dashboard → Site settings → Environment variables
2. Click the variable to edit
3. Update value → Save
4. Go to Deploys → Trigger deploy → Deploy site
5. Wait for build to complete

### Change Shared Password
1. Netlify Dashboard → Site settings → Environment variables
2. Edit `NEXT_PUBLIC_SHARED_CODE`
3. Save the new value
4. Trigger a new deployment
5. Share new password with family

### Rollback to Previous Version
1. Netlify Dashboard → Deploys
2. Find the working deployment
3. Click options (•••) → Publish deploy
4. Confirm the rollback

## 📊 Monitoring Deployments

### Check Deployment Status
- **Dashboard:** https://app.netlify.com
- **Deploys Tab:** See all deployments and their status
- **Build Logs:** Click on a deployment to see detailed logs

### Deployment States
- 🟡 **Building:** App is being built
- 🟢 **Published:** Live and accessible
- 🔴 **Failed:** Check logs for errors
- ⏸️ **Stopped:** Build was canceled

## 🐛 Troubleshooting

### Build Fails After Push
1. Check build logs in Netlify Dashboard
2. Common causes:
   - TypeScript errors
   - Missing dependencies
   - Environment variables not set
3. Fix the issue and push again

### Environment Variable Not Working
- Remember: Changes require a new deployment
- Check variable name is exactly correct (case-sensitive)
- Verify the value doesn't have extra spaces
- Trigger a new deploy after changing

### Site Shows Old Version
- Check Deploys tab - is latest deployment published?
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check if you pushed to the correct branch

## 🎯 Best Practices

### 1. Test Locally First
```bash
# Test your changes before pushing
npm run dev
# Visit http://localhost:3000
```

### 2. Use Descriptive Commit Messages
```bash
# Good
git commit -m "Add email notifications feature"

# Not helpful
git commit -m "fix stuff"
```

### 3. Monitor Deployments
- Check Netlify dashboard after pushing
- Verify deployment succeeds before sharing updates

### 4. Keep Environment Variables Secure
- Never commit `.env` files to Git
- Only set variables in Netlify dashboard
- Don't share Firebase config publicly

### 5. Test After Deployment
- Visit the live site after each deployment
- Test critical features (login, save predictions, view results)
- Check on mobile and desktop

## 📧 Email Notifications

Enable deployment notifications:
1. Netlify Dashboard → Site settings → Build & deploy
2. Scroll to "Deploy notifications"
3. Add email notification for:
   - Deploy failed
   - Deploy succeeded (optional)

## 🔗 Useful Links

- **Netlify Dashboard:** https://app.netlify.com
- **Firebase Console:** https://console.firebase.google.com
- **Your Site:** https://your-site-name.netlify.app
- **Deployment Docs:** [DEPLOYMENT.md](DEPLOYMENT.md)
- **Project Structure:** [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

## 💡 Quick Commands

```bash
# Check what will be deployed
git status

# See recent commits
git log --oneline -5

# Push changes (triggers deployment)
git push origin main

# View build locally
npm run build
npm start
```

## 🆘 Get Help

If something goes wrong:
1. Check Netlify build logs
2. Look at browser console for client errors
3. Review Firebase Firestore logs
4. Check this guide's Troubleshooting section
5. Review [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions

---

**Remember:** Netlify handles deployments automatically. Just push to GitHub and it takes care of the rest! 🎉
