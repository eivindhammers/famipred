# Deployment Guide for Familiespådommer 2026

This guide will help you deploy the Family Predictions app to Netlify with Firebase backend.

## Prerequisites

- A GitHub account
- A Firebase account (free tier is sufficient)
- A Netlify account (free tier is sufficient)

## Step 1: Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Enter a project name (e.g., "famipred-2026")
4. Follow the setup wizard (Google Analytics is optional)

### Enable Firestore Database

1. In your Firebase project, click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in production mode" (we'll adjust rules later)
4. Select a location close to your users (e.g., europe-west)
5. Click "Enable"

### Configure Firestore Security Rules

After creating the database, update the security rules:

1. Go to "Firestore Database" → "Rules"
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /predictions/{document=**} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

3. Click "Publish"

**Note:** These rules allow anyone to read and write. For production, you should implement proper authentication.

### Get Firebase Configuration

1. Click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps"
4. Click the web icon (`</>`) to add a web app
5. Register the app with a nickname (e.g., "Familiespådommer Web")
6. Copy the Firebase configuration object

You'll need these values:
- `apiKey`
- `authDomain`
- `projectId`
- `storageBucket`
- `messagingSenderId`
- `appId`

## Step 2: Deploy to Netlify with Continuous Deployment

Netlify will automatically deploy your app whenever you push changes to GitHub. This guide shows you how to set it up.

### Connect Your Repository to Netlify

1. Push your code to GitHub if you haven't already
2. Go to [Netlify](https://www.netlify.com/) and log in
3. Click "Add new site" → "Import an existing project"
4. Choose "Deploy with GitHub"
5. Authorize Netlify to access your GitHub repositories
6. Select the `eivindhammers/famipred` repository
7. Configure the build settings (Netlify will detect Next.js automatically):
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Base directory:** (leave empty)
   - **Branch to deploy:** Select your main branch (e.g., `main` or `master`)

### Set Environment Variables in Netlify

**Important:** Environment variables must be configured in Netlify, not committed to your repository.

1. In your Netlify site dashboard, go to **Site settings** → **Environment variables**
2. Click **Add a variable** and add each of the following with values from Firebase:

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_SHARED_CODE=your_custom_password_here
   ```

3. Make sure all variables are set for **Production** deployments
4. Click **Save**

### Initial Deployment

1. After setting environment variables, click **Deploy site** (or trigger a new deploy if already deployed)
2. Netlify will build and deploy your app automatically
3. Once complete, you'll get a URL like `https://your-site-name.netlify.app`

### Continuous Deployment in Action

From now on, whenever you push changes to GitHub:
- Netlify automatically detects the push
- Builds your app with the latest code
- Deploys the new version to production
- No manual intervention needed!

You can monitor deployments in the Netlify dashboard under **Deploys**.

### Option B: Deploy via Netlify UI (First-time Setup)

If you prefer to set up everything through the UI during initial deployment:

1. During site creation, click "Show advanced" before deploying
2. Click "New variable" to add each environment variable
3. Add all 7 required environment variables (listed above)
4. Click "Deploy site"

This sets up both the initial deployment and continuous deployment at once.

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Initialize the site:
```bash
netlify init
```

4. Set environment variables:
```bash
netlify env:set NEXT_PUBLIC_FIREBASE_API_KEY "your_api_key_here"
netlify env:set NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN "your_project_id.firebaseapp.com"
netlify env:set NEXT_PUBLIC_FIREBASE_PROJECT_ID "your_project_id"
netlify env:set NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET "your_project_id.appspot.com"
netlify env:set NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID "your_sender_id"
netlify env:set NEXT_PUBLIC_FIREBASE_APP_ID "your_app_id"
netlify env:set NEXT_PUBLIC_SHARED_CODE "your_custom_password_here"
```

5. Deploy:
```bash
netlify deploy --prod
```

## Step 3: Configure Custom Domain (Optional)

1. In Netlify, go to "Site settings" → "Domain management"
2. Click "Add custom domain"
3. Follow the instructions to configure your DNS

## Step 4: Test Your Deployment

1. Visit your Netlify URL (e.g., `https://your-site-name.netlify.app`)
2. Test login with your shared code
3. Register some test predictions
4. Verify the results page displays correctly
5. Test CSV export functionality

## Step 5: Share with Family

1. Share the Netlify URL with your family members
2. Share the shared code word (set in `NEXT_PUBLIC_SHARED_CODE`)
3. Each family member logs in with their name and the shared code
4. Everyone can view and compare predictions!

## Continuous Deployment Workflow

Once your site is deployed, Netlify handles updates automatically:

### Making Updates

1. Make changes to your code locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```
3. Netlify automatically detects the push and starts building
4. New version goes live in 2-5 minutes
5. Check deployment status at `https://app.netlify.com`

### Updating Environment Variables

To change Firebase config or shared password:

1. Go to Netlify dashboard → **Site settings** → **Environment variables**
2. Click the variable you want to change
3. Update the value and click **Save**
4. Trigger a new deployment:
   - Go to **Deploys** tab
   - Click **Trigger deploy** → **Deploy site**
5. The new environment variable will be active after deployment

**Note:** Environment variable changes require a new deployment to take effect.

### Viewing Deployment History

1. Go to your Netlify site dashboard
2. Click **Deploys** tab
3. See all deployments, their status, and logs
4. Rollback to previous version if needed

## Updating the Shared Code

To change the shared password:

1. In Netlify, go to "Site settings" → "Environment variables"
2. Click on `NEXT_PUBLIC_SHARED_CODE`
3. Update the value and click **Save**
4. Trigger a new deploy (Deploys → Trigger deploy → Deploy site)
5. Share the new code with family members

## Troubleshooting

### Build Fails

- Check that all environment variables are set correctly
- Verify Firebase configuration is valid
- Check the build logs in Netlify for specific errors

### Can't Save Predictions

- Verify Firestore is enabled in Firebase
- Check Firestore security rules allow writes
- Open browser console to see specific error messages

### Login Doesn't Work

- Verify `NEXT_PUBLIC_SHARED_CODE` is set correctly
- Clear browser cache and try again
- Check browser console for errors

## Monitoring and Maintenance

### View Predictions in Firebase

1. Go to Firebase Console → Firestore Database
2. Click on the "predictions" collection
3. View all stored predictions

### Netlify Analytics (Optional)

Enable Netlify Analytics to track:
- Page views
- User engagement
- Performance metrics

### Backup Data

Regularly export data using the CSV export feature in the app.

## Security Considerations

**Important:** The current Firestore rules allow public read/write access. For production:

1. Implement proper Firebase Authentication
2. Restrict Firestore rules to authenticated users only
3. Add rate limiting to prevent abuse
4. Use environment variables for sensitive data
5. Enable Firebase App Check for additional security

## Cost Considerations

- **Firebase Free Tier:** 1GB storage, 50K reads/day, 20K writes/day
- **Netlify Free Tier:** 100GB bandwidth/month, 300 build minutes/month

For a small family app, free tiers should be sufficient!

## Support

For issues or questions:
- Check the [README.md](README.md) for basic usage
- Review Firebase and Netlify documentation
- Contact the repository owner

---

Enjoy predicting the future with your family! 🔮
