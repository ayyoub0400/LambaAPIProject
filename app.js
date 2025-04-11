const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  console.log('GET / - Rendering index page');
  res.render('index', { shortenedUrl: null, error: null });
});

app.post('/shorten', async (req, res) => {
  try {
    let longUrl = req.body.url.trim();
    
    // Check if URL is empty after trimming
    if (!longUrl) {
      console.error('Empty URL submitted');
      return res.render('index', { 
        shortenedUrl: null, 
        error: 'Please enter a URL to shorten'
      });
    }
    
    // Remove http:// or https:// temporarily for validation
    let urlForValidation = longUrl.replace(/^https?:\/\//i, '');
    
    // Check for at least one dot (for TLD)
    if (!urlForValidation.includes('.')) {
      console.error('URL missing TLD:', longUrl);
      return res.render('index', { 
        shortenedUrl: null, 
        error: 'Please enter a valid URL with a domain extension (e.g. .com, .org)'
      });
    }
    
    // Basic domain name validation
    const domainPattern = /^([a-zA-Z0-9][-a-zA-Z0-9]*[a-zA-Z0-9]\.)+[a-zA-Z]{2,}$/;
    if (!domainPattern.test(urlForValidation.split('/')[0])) {
      console.error('Invalid domain format:', urlForValidation.split('/')[0]);
      return res.render('index', { 
        shortenedUrl: null, 
        error: 'Please enter a valid domain name (e.g. example.com)'
      });
    }
    
    // Add https:// if not already present
    if (!longUrl.startsWith('https://') && !longUrl.startsWith('http://')) {
      longUrl = 'https://' + longUrl;
    }
    
    console.log(`POST /shorten - Shortening URL: ${longUrl}`);
    
    const response = await axios.post('https://api.myurlshorterner.online/shorten', {
      long_url: longUrl
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('API Response:', JSON.stringify(response.data, null, 2));
    
    // Pass the response data directly without validation
    const shortenedUrl = {
      short_url: response.data[""] || response.data.short_url,
      long_url: longUrl
    };
    
    console.log(`Successfully shortened URL to: ${shortenedUrl.short_url}`);
    res.render('index', { shortenedUrl: shortenedUrl, error: null });
  } catch (error) {
    console.error('Error shortening URL:', error.message);
    if (error.response) {
      console.error('API Error Response:', JSON.stringify(error.response.data, null, 2));
    }
    res.render('index', { 
      shortenedUrl: null, 
      error: 'Error shortening URL. Please try again.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Press Ctrl+C to stop the server`);
}); 