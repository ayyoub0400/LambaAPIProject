# URL Shortener Application

A simple URL shortener application built with Node.js and Express that integrates with the URL shortener API.

## Features

- Simple and clean user interface
- Automatically adds 'https://' prefix if not present
- Displays shortened URL with a clickable link
- Error handling for API failures

## Installation

1. Clone this repository:
```
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
```

2. Install dependencies:
```
npm install
```

3. Start the application:
```
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

1. Enter a URL in the input field (without the 'https://' prefix as it's already provided)
2. Click the "Shorten URL" button
3. The shortened URL will be displayed below the form

## Technologies Used

- Node.js
- Express
- EJS (for templating)
- Axios (for API requests)
- Bootstrap (for styling)

## API Integration

This application integrates with the URL shortener API at https://api.myurlshorterner.online/shorten 