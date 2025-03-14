<p align="center">
  <img src="../../logo.svg" alt="Sans UI Logo" width="138" height="74" />
</p>

# Sans UI Backend Example

This is a simple backend API example for Sans UI using Elysia.js and Mailgun. It provides an API endpoint for handling subscription form submissions and sending welcome emails.

## Features

- RESTful API built with Elysia.js
- Email sending with Mailgun
- Supabase integration for storing subscribers
- CORS support for cross-origin requests
- Environment-based configuration

## Prerequisites

- Node.js 18+ (for ES modules support)
- Supabase account (for storing subscribers)
- Mailgun account (for sending emails)

## Setup

1. Clone the repository
2. Navigate to the backend example directory:
   ```bash
   cd examples/backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy the sample environment file and update it with your credentials:
   ```bash
   cp sample.env .env
   ```
5. Edit the `.env` file with your Mailgun API key and other settings

## Configuration

Update the `.env` file with your own settings:

```env
# API Configuration
PORT=3001
API_KEY=your_api_key_here

# Mailgun Configuration
MAILGUN_API_KEY=your_mailgun_api_key_here
MAILGUN_DOMAIN=your_mailgun_domain.com
EMAIL_FROM=Sans UI <noreply@your_mailgun_domain.com>

# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your_supabase_anon_key_here
SUPABASE_TABLE=subscribers

# CORS Configuration
ALLOW_ORIGINS=http://localhost:3000,http://localhost:8000
```

## Running the API

Start the server:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

## API Endpoints

### Health Check

```
GET /health
```

Returns the API status and current timestamp.

### Subscribe

```
POST /subscribe
```

Accepts subscription form data and sends a welcome email.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "consent": true
}
```

**Response:**

```json
{
  "success": true,
  "message": "Subscription successful"
}
```

### Get Subscribers (Protected)

```
GET /subscribers
```

Returns a list of all subscribers. Requires API key authentication.

**Headers:**

```
Authorization: Bearer your_api_key_here
```

## Integration with Sans UI Frontend

Update the subscription form in the frontend example to send data to this API:

```javascript
// In subscribe.js
async handleSubmit(event) {
  event.preventDefault();
  
  // Validate form
  if (!this.validateEmail()) return;
  
  const formData = {
    name: this.nameInput.value.trim(),
    email: this.emailInput.value.trim(),
    consent: this.consentCheckbox.checked
  };
  
  try {
    // Send data to the backend API
    const response = await fetch('http://localhost:3001/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Show success message
      this.subscribeForm.style.display = 'none';
      this.successMessage.style.display = 'block';
      
      // Show native notification if bridge is available
      if (window.bridge && typeof window.bridge.showNotification === 'function') {
        window.bridge.showNotification({
          title: 'Subscription Successful',
          text: `Thank you, ${formData.name}! You've been added to our waitlist.`,
          iconName: 'mail-mark-important'
        });
      }
    } else {
      this.showError(result.message || 'Subscription failed');
    }
  } catch (error) {
    console.error('Subscription error:', error);
    this.showError(`Could not process subscription: ${error.message}`);
  }
}
```

## License

Same as the main Sans UI project.

---

*Built happily using "Windsurf on Linux"*  
*Sponsored by [Profullstack, Inc.](https://profullstack.com)*
