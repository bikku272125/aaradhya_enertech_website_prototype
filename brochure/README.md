# Transformer & Electrical Services Company Website

A professional, modern, mobile-first static website tailored for a Transformer Sales and Electrical Services company. Built with HTML5, CSS3, Vanilla JavaScript, and Google Apps Script.

## Features
- Mobile-first responsive design
- Project gallery with image lightbox
- Functional contact form saving to Google Sheets
- Floating WhatsApp integration
- SEO optimized (sitemap, robots.txt, semantic HTML)

---

## 1. How to Run Locally

Since this is a static website, you do not need a backend server (like Node.js or Python) to view it.
You can simply open `index.html` in any web browser.

**Option A: Open directly**
1. Navigate to the `electrical-company` folder.
2. Double-click `index.html` to open it in your default browser.

**Option B: Use VS Code Live Server (Recommended)**
1. Open the folder in VS Code.
2. Install the "Live Server" extension.
3. Right-click on `index.html` and select "Open with Live Server".

---

## 2. How to Customize Business Information

You need to replace the placeholders across the HTML files and `js/script.js`.

### Text Replacements in HTML
Search globally (using your code editor) for the following placeholders and replace them:
- `[COMPANY NAME]` -> e.g., "VoltTech Transformers"
- `[CITY]` -> e.g., "Mumbai"
- `[STATE]` -> e.g., "Maharashtra"
- `[ADDRESS, CITY, STATE]` -> e.g., "123 Industrial Area, Andheri East, Mumbai, Maharashtra"
- `[PHONE NUMBER]` -> e.g., "+91 98765 43210"
- `[EMAIL]` -> e.g., "info@volttech.com"
- `PASTE_YOUR_PHONE_NUMBER_HERE` -> e.g., "+919876543210" (No spaces, include country code. Used in `tel:` links).

### Updating Config in `js/script.js`
Open `js/script.js` and update the top configuration section:

```javascript
const COMPANY_CONFIG = {
    GOOGLE_SCRIPT_URL: "PASTE_YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE", // See section 4
    WHATSAPP_NUMBER: "919876543210", // No '+', no spaces
    PHONE_NUMBER: "+919876543210"
};
```

---

## 3. How to Replace Images

Images are referenced in the CSS (hero background) and HTML files (projects, about).

1. **Hero Background**: Replace `images/hero/hero-bg.jpg` with a high-quality image of a transformer or industrial setting. Update `css/style.css` if the filename changes.
2. **Projects Gallery**: Place your project images in `images/projects/`. Open `projects.html` and update the `<img src="...">` tags inside the project cards to point to your new images.
3. **About Image**: Update the placeholder div in `about.html` with an `<img>` tag pointing to an image in `images/about/` or `images/hero/`.

---

## 4. Connecting Contact Form to Google Sheets

The contact form is configured to send POST requests to a Google Apps Script Web App. 

### Step-by-Step Guide:
1. Go to [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet.
2. Name the spreadsheet (e.g., "Website Enquiries").
3. In the top menu, click **Extensions > Apps Script**.
4. A new tab will open. Delete any code in `Code.gs`.
5. Open `google-apps-script/Code.gs` from this project folder, copy all the code, and paste it into the Google Apps Script editor.
6. Click the Save icon (floppy disk) or press `Ctrl+S` / `Cmd+S`.
7. Click the **Deploy** button at the top right, and select **New deployment**.
8. Click the gear icon next to "Select type" and choose **Web app**.
9. Fill out the form:
   - Description: "V1 Contact Form"
   - Execute as: **Me (your email)**
   - Who has access: **Anyone** (This is crucial, otherwise the public website cannot send data).
10. Click **Deploy**. (You may need to authorize the script; follow the prompts and click "Advanced" -> "Go to script (unsafe)").
11. Copy the **Web app URL**.
12. Open `js/script.js` in your project folder, and replace `"PASTE_YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE"` with the copied URL.
13. Test the form on your website. Submissions should instantly appear as new rows in your Google Sheet!

---

## 5. Deployment Options (Free)

### GitHub Pages (Simplest for static sites)
1. Create a GitHub account and a new public repository (e.g., `my-electrical-website`).
2. Upload all files from the `electrical-company` folder (not the folder itself, but the contents inside it).
3. In your GitHub repository, go to **Settings > Pages**.
4. Under "Build and deployment", set the Source to **Deploy from a branch**. Select `main` (or `master`) and `/root`. Click Save.
5. Your site will be live at `https://[your-username].github.io/[repo-name]`.

### Vercel
1. Create a GitHub repository and push your code as described above.
2. Go to [Vercel](https://vercel.com) and sign up with GitHub.
3. Click **Add New > Project**.
4. Import your GitHub repository.
5. Leave all build settings as default (Vercel detects static HTML automatically).
6. Click **Deploy**.

### Netlify
1. Create a GitHub repository and push your code.
2. Go to [Netlify](https://netlify.com) and sign up with GitHub.
3. Click **Add new site > Import an existing project**.
4. Connect to GitHub and select your repository.
5. Leave build settings empty (as it's static HTML).
6. Click **Deploy site**.

### Custom Domain
Once deployed on Vercel, Netlify, or GitHub Pages, you can go to the project settings on their respective platforms, navigate to "Domains", and add your custom domain (e.g., `www.volttech.com`). You will need to configure DNS records (CNAME or A records) with your domain provider (e.g., GoDaddy, Namecheap) to point to the hosting service.

---
*Built with ❤️ for the Electrical & Transformer Industry.*
