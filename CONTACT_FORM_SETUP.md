# Contact Form Email Setup Guide

Your contact form is now set up to send emails using EmailJS! Here's how to complete the setup:

## What I've Added

✅ **EmailJS SDK integration** in your HTML
✅ **Form submission handler** in your JavaScript
✅ **Loading states** and user feedback
✅ **Success/Error notifications**
✅ **Form validation styling**

## Step-by-Step Setup

### 1. Create an EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/) and sign up for a free account
2. Verify your email address

### 2. Set Up Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. **Copy your Service ID** (you'll need this)

### 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Design your email template using these variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{message}}` - Sender's message
   - `{{to_name}}` - Recipient name
   - `{{to_email}}` - Recipient email (niarasena14@gmail.com)
4. **Copy your Template ID** (you'll need this)

### 4. Get Your Public Key
1. Go to "Account" → "API Keys"
2. **Copy your Public Key**

### 5. Update Your Code
Replace the placeholder values in your files:

**In `contact.html` (around line 30):**
```javascript
emailjs.init("YOUR_PUBLIC_KEY_HERE");
```

**In `js/script.js` (around line 95):**
```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

## Example Email Template

Here's a simple template you can use:

**Subject:** New Contact Form Submission from {{from_name}}

**Body:**
```
Hello {{to_name}},

You have received a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Message: {{message}}

This message was sent to: {{to_email}}

Best regards,
Your Website Contact Form
```

**Important:** In your EmailJS template settings, make sure to set the "To Email" field to: `niarasena14@gmail.com`

## How It Works

1. **User fills out form** and clicks submit
2. **Form data is captured** and sent to EmailJS
3. **EmailJS processes** the request using your template
4. **Email is sent** to your specified email address
5. **User gets feedback** (success/error notification)

## Features Included

- ✅ **Form validation** with visual feedback
- ✅ **Loading states** during submission
- ✅ **Success/Error notifications** that auto-dismiss
- ✅ **Form reset** after successful submission
- ✅ **Responsive design** that works on all devices
- ✅ **No backend required** - works with static hosting

## Testing

1. Fill out the form with test data
2. Submit and check your email
3. Verify the notification appears
4. Check browser console for any errors

## Troubleshooting

**Form not sending emails:**
- Verify all IDs are correct (Service ID, Template ID, Public Key)
- Check browser console for error messages
- Ensure EmailJS service is properly configured

**Emails not received:**
- Check spam folder
- Verify email service configuration
- Test with a different email address

## Alternative Solutions

If you prefer other options:

### Option 2: Netlify Forms
- Add `netlify` attribute to your form
- Works automatically with Netlify hosting
- No additional setup required

### Option 3: Formspree
- Similar to EmailJS but different interface
- Good for simple forms

### Option 4: Backend API
- More control but requires server setup
- Options: Node.js, PHP, Python, etc.

## Security Notes

- EmailJS public keys are safe to expose in frontend code
- Consider adding CAPTCHA for production use
- Monitor for spam submissions

## Support

- EmailJS Documentation: [docs.emailjs.com](https://docs.emailjs.com/)
- EmailJS Community: [community.emailjs.com](https://community.emailjs.com/)

Your contact form is now ready to send emails! 🎉
