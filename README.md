# Static URL Shortener Application

A simple, static -AI Generated- HTML/CSS/JavaScript web app. 

Provides a simple UI to facilitate POST requests for my URL shortener API.

## Features

- Simple and clean user interface (pure HTML/CSS)
- All logic handled client-side with vanilla JavaScript
- Automatically adds 'https://' prefix if not present
- Displays shortened URL with a clickable link
- Client-side URL validation
- Error handling for API failures
- Copy-to-clipboard functionality

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript

🧠 How it Works:
User submits a long URL via the frontend → sent to API Gateway
Lambda gets triggered and generates a short ID, saves it to DynamoDB, and returns a short URL
User visits the short link → Lambda redirects to the original URL

🔧 Stack Breakdown:
S3 + CloudFront (with TLS): Static front-end hosting with Caching
API Gateway (Custom Domain + TLS via ACM): API layer
Lambda: Handles logic for generating short codes and redirections
DynamoDB: Stores { shortCode : longURL } mappings
GoDaddy: Domain registration and DNS routing
ACM: Certificate provisioning
