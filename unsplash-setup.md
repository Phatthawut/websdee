# Unsplash Integration Setup Guide

This guide will help you set up Unsplash integration for your article management system to easily select high-quality, free photos for your articles.

## 🎯 What You Get

- **Free high-quality photos**: Access to millions of professional photos
- **Easy integration**: Browse and select photos directly in your article editor
- **Automatic attribution**: Proper photographer credits (optional but appreciated)
- **Legal compliance**: All photos are free for commercial use
- **API limits**: 50 requests/hour, 5,000/month (free tier)

## 📋 Prerequisites

1. An Unsplash account (free)
2. Your Vue.js application with admin panel

## 🚀 Setup Steps

### Step 1: Create Unsplash Developer Account

1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Sign up or log in to your Unsplash account
3. Click "Register as a developer"
4. Accept the developer terms

### Step 2: Create a New Application

1. Go to [Your Apps](https://unsplash.com/oauth/applications)
2. Click "New Application"
3. Fill out the application form:
   - **Application name**: WebsDee Blog (or your preferred name)
   - **Description**: Blog article image management system
   - **Website**: Your website URL
   - **Additional information**: Used for selecting featured images for blog articles
4. Accept the terms and click "Create application"

### Step 3: Get Your Access Key

1. After creating the application, you'll see your app details
2. Copy the **Access Key** (NOT the Secret Key)
3. Keep this key secure - you'll need it for the environment variables

### Step 4: Add Environment Variable

Add the following to your `.env` file (create one if it doesn't exist):

```env
# Unsplash API Configuration
VITE_UNSPLASH_ACCESS_KEY=your_access_key_here
```

Replace `your_access_key_here` with the Access Key you copied from step 3.

### Step 5: Restart Your Development Server

```bash
npm run dev
```

## ✅ Testing the Integration

1. Go to your admin panel
2. Create or edit an article
3. Look for the "Featured Image" section
4. Click "Choose from Unsplash" button
5. Search for photos or browse featured images
6. Click on any photo to select it

## 📸 How It Works

### In the Article Editor

1. **Image Selection**: Click "Choose from Unsplash" to open the image picker
2. **Search**: Search for specific topics or browse featured photos
3. **Quick Categories**: Use preset categories like "business", "technology", etc.
4. **Preview**: See photo details including photographer name and engagement metrics
5. **Select**: Click any photo to automatically set it as your featured image
6. **Attribution**: Proper attribution is automatically saved with the article

### Features Included

- **Search functionality**: Find photos by keyword
- **Category browsing**: Quick access to business, tech, design photos
- **Pagination**: Loads 12 photos initially with "Load More" button
- **Progress tracking**: Shows current count vs total available photos
- **Responsive design**: Works on desktop and mobile (2-3-4 column grid)
- **Automatic tracking**: Complies with Unsplash API guidelines
- **Error handling**: Graceful fallbacks if API is unavailable

## 🔒 Legal & Compliance

### What's Allowed

- ✅ Use photos for commercial purposes
- ✅ Use photos for blog articles
- ✅ Modify and edit photos
- ✅ Use photos without attribution (though appreciated)

### What's Not Allowed

- ❌ Don't sell unedited photos as standalone products
- ❌ Don't create competing photo platforms
- ❌ Don't use photos for harmful or illegal content

### Best Practices

- Include photographer attribution when possible
- Follow Unsplash community guidelines
- Respect the API rate limits
- Use appropriate search terms

## 🛠 Customization Options

### Search Categories

You can modify the quick search categories in `UnsplashImagePicker.vue`:

```javascript
const quickCategories = [
  "business",
  "technology",
  "design",
  "office",
  "computer",
  "marketing",
  "workspace",
];
```

### Photos Per Page

The integration loads 12 photos initially and 12 more with each "Load More" click. You can modify this in `UnsplashImagePicker.vue`:

```javascript
const photosPerPage = 12; // Change this number to load more/fewer photos
```

### Image Sizes

The integration uses `regular` size by default (1080px width). You can change this in the `selectPhoto` function:

```javascript
// Available sizes: raw, full, regular, small, thumb
url: photo.urls.regular;
```

### Attribution Display

Attribution is stored with each article and can be displayed in your blog posts:

```vue
<div v-if="article.imageAttribution" class="text-sm text-gray-500">
  <span v-html="article.imageAttribution"></span>
</div>
```

## 🚨 Troubleshooting

### Common Issues

**"Unsplash access key is required" error**

- Check that `VITE_UNSPLASH_ACCESS_KEY` is set in your `.env` file
- Restart your development server after adding the key
- Ensure there are no extra spaces around the key

**API rate limit exceeded**

- Free tier allows 50 requests/hour
- Consider caching popular searches
- For higher limits, apply for production access on Unsplash

**Images not loading**

- Check browser console for network errors
- Verify your access key is valid
- Ensure your application is properly configured on Unsplash

**Search returns no results**

- Try broader search terms
- Check if your search query contains special characters
- Browse featured photos instead

### Getting Help

If you encounter issues:

1. Check the browser console for error messages
2. Verify your Unsplash API key is correct
3. Test with simple search terms like "computer" or "office"
4. Review the [Unsplash API documentation](https://unsplash.com/documentation)

## 📊 API Limits & Monitoring

### Free Tier Limits

- **50 requests per hour**
- **5,000 requests per month**
- Rate limits reset every hour

### Monitoring Usage

- Check your [Unsplash app dashboard](https://unsplash.com/oauth/applications) for usage statistics
- The integration includes error handling for rate limit exceeded

### Upgrading Limits

For production applications with higher usage:

1. Apply for Production Access on your Unsplash app
2. Provide details about your application
3. Wait for approval (usually 1-2 weeks)
4. Production access provides 5,000 requests/hour

## 🎉 You're All Set!

Your Unsplash integration is now ready! You can now:

- Browse beautiful, professional photos
- Select images directly in your article editor
- Enhance your blog with high-quality visuals
- Comply with proper attribution practices

Happy blogging! 📝✨
