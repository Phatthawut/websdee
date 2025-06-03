# 🚀 Firebase + Vercel Setup Guide

## 📋 **Architecture Overview**

- **Frontend**: Vue.js app deployed on Vercel
- **Database**: Firebase Firestore (NoSQL)
- **Admin**: Firebase Console
- **Authentication**: Firebase Auth (optional)
- **Storage**: Firebase Storage (for images)

---

## 🔥 **Firebase Setup**

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name (e.g., "websdee-blog")
4. Enable Google Analytics (optional)
5. Create project

### 2. Setup Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode" (we'll set rules later)
4. Select location (closest to your users)

### 3. Create Firestore Collection Structure

Create a collection called `articles` with this document structure:

```javascript
// Collection: articles
// Document ID: auto-generated or custom
{
  title: {
    en: "Your English Title",
    th: "ชื่อเรื่องภาษาไทย"
  },
  excerpt: {
    en: "English excerpt...",
    th: "บทคัดย่อภาษาไทย..."
  },
  content: {
    en: "<p>English HTML content...</p>",
    th: "<p>เนื้อหาภาษาไทย HTML...</p>"
  },
  category: "web-development", // web-development, design, seo, business, technology
  image: "https://images.unsplash.com/photo-xxx",
  slug: "your-article-slug",
  readTime: 8,
  tags: ["web-development", "trends", "2025"],
  author: {
    name: "Author Name",
    avatar: "https://images.unsplash.com/photo-author"
  },
  publishedAt: "2024-12-15", // YYYY-MM-DD format
  status: "published", // published, draft, archived
  createdAt: "2024-12-15T10:30:00Z", // ISO string
  updatedAt: "2024-12-15T10:30:00Z"  // ISO string
}
```

### 4. Setup Firestore Security Rules

In Firestore, go to "Rules" tab and use:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to published articles
    match /articles/{document} {
      allow read: if resource.data.status == 'published';
      // Only authenticated users can write (for admin)
      allow write: if request.auth != null;
    }
  }
}
```

### 5. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll to "Your apps" section
3. Click "Web app" icon (</>)
4. Register app name
5. Copy the config object

---

## 📝 **Environment Variables**

Create `.env` file in your project root:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdefghijk
```

---

## 🌐 **Vercel Deployment**

### 1. Prepare for Deployment

```bash
# Build the project locally to test
npm run build

# Test the build
npm run preview
```

### 2. Deploy to Vercel

#### Option A: GitHub Integration (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add environment variables in Vercel dashboard
7. Deploy

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

### 3. Configure Environment Variables in Vercel

1. Go to your project dashboard in Vercel
2. Click "Settings" tab
3. Click "Environment Variables"
4. Add all your Firebase environment variables
5. Redeploy the project

---

## 🛠 **Managing Content**

### Option 1: Firebase Console (Simple)

1. Go to Firestore in Firebase Console
2. Navigate to `articles` collection
3. Add/Edit documents manually
4. Use the document structure above

### Option 2: Custom Admin Panel (Advanced)

Create a separate admin app with Firebase Admin SDK:

```javascript
// admin-panel/index.js
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

// Add article function
async function addArticle(articleData) {
  const docRef = await db.collection("articles").add({
    ...articleData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  console.log("Article added with ID:", docRef.id);
}
```

### Option 3: Third-party CMS

- **Forestry** (now TinaCMS)
- **Sanity**
- **Strapi**
- **Contentful**

---

## 📊 **Sample Data**

Add this sample article to test your setup:

```json
{
  "title": {
    "en": "Getting Started with Firebase",
    "th": "เริ่มต้นใช้งาน Firebase"
  },
  "excerpt": {
    "en": "Learn how to set up Firebase for your web application",
    "th": "เรียนรู้วิธีการตั้งค่า Firebase สำหรับเว็บแอปพลิเคชันของคุณ"
  },
  "content": {
    "en": "<h2>Introduction</h2><p>Firebase is a powerful platform...</p>",
    "th": "<h2>บทนำ</h2><p>Firebase เป็นแพลตฟอร์มที่ทรงพลัง...</p>"
  },
  "category": "web-development",
  "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
  "slug": "getting-started-with-firebase",
  "readTime": 5,
  "tags": ["firebase", "web-development", "tutorial"],
  "author": {
    "name": "Tech Writer",
    "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
  },
  "publishedAt": "2024-12-15",
  "status": "published",
  "createdAt": "2024-12-15T10:30:00Z",
  "updatedAt": "2024-12-15T10:30:00Z"
}
```

---

## 🔍 **Testing**

1. **Local Development**:

   ```bash
   npm run dev
   ```

2. **Production Build**:

   ```bash
   npm run build
   npm run preview
   ```

3. **Test Firebase Connection**:
   - Add a test article in Firebase Console
   - Check if it appears on your website

---

## 🚨 **Important Notes**

1. **Security**: Never commit `.env` files to Git
2. **Indexes**: Firestore may require composite indexes for complex queries
3. **Billing**: Monitor Firebase usage to avoid unexpected charges
4. **Backup**: Regularly backup your Firestore data
5. **Performance**: Consider implementing caching for better performance

---

## 🆘 **Troubleshooting**

### Common Issues:

1. **CORS Errors**: Make sure Firebase project is properly configured
2. **Environment Variables**: Ensure all VITE\_ prefixed variables are set
3. **Build Errors**: Check that all Firebase imports are correct
4. **404 on Refresh**: Configure Vercel redirects for SPA routing

### Vercel Redirects (vercel.json):

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 📚 **Resources**

- [Firebase Documentation](https://firebase.google.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)

---

Good luck with your deployment! 🎉
