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

## Step 2: Deploy to Netlify

### Option A: Deploy via Netlify UI (Recommended)

1. Push your code to GitHub if you haven't already
2. Go to [Netlify](https://www.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Choose "Deploy with GitHub"
5. Authorize Netlify to access your GitHub repositories
6. Select the `eivindhammers/famipred` repository
7. Configure the build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Base directory:** (leave empty)

8. Add environment variables:
   - Click "Show advanced" → "New variable"
   - Add the following variables with values from Firebase:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
     NEXT_PUBLIC_SHARED_CODE=your_custom_password_here
     ```

9. Click "Deploy site"

### Option B: Deploy via Netlify CLI

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

## Updating the Shared Code

To change the shared password:

1. In Netlify, go to "Site settings" → "Environment variables"
2. Edit `NEXT_PUBLIC_SHARED_CODE`
3. Save and trigger a new deploy
4. Share the new code with family members

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
