# Mental Health Checker

A web application that analyzes user input text for sentiment and provides appropriate responses based on the emotional content.

## Technical Overview

This project consists of a Flask backend server and a simple HTML/CSS/JavaScript frontend that work together to provide real-time sentiment analysis of user input.

### Architecture

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python Flask server
- **Sentiment Analysis**: TextBlob library
- **API Communication**: RESTful endpoints using fetch API

## Project Structure

```
.
├── app.py              # Flask backend server
├── index.html          # Main HTML interface
├── script.js           # Frontend JavaScript logic
├── style.css           # CSS styling
└── README.md           # Project documentation
```

## Features

- Real-time sentiment analysis of user input
- Visual feedback using emojis (👍 for positive, 👎 for negative, 🍆 for neutral)
- Joke delivery for negative sentiment responses
- Responsive design
- Error handling and user feedback

## Technical Details

### Backend (app.py)

- **Framework**: Flask
- **Port**: 5000
- **Endpoints**:
  - `GET /`: Serves the main HTML page
  - `POST /analyze`: Processes sentiment analysis requests
- **Dependencies**:
  - Flask
  - Flask-CORS
  - TextBlob

### Frontend

#### HTML (index.html)
- Simple, clean interface
- Input field for user text
- Submit button for analysis
- Result display area

#### JavaScript (script.js)
- Handles user input submission
- Makes API calls to backend
- Manages response display
- Implements error handling

#### CSS (style.css)
- Responsive design
- Modern styling
- Mobile-friendly layout

## Setup Instructions

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Start the Backend Server**
   ```bash
   python app.py
   ```

3. **Access the Application**
   - Open `index.html` in a web browser
   - Or serve it using a local server

## API Documentation

### POST /analyze

**Request:**
```json
{
    "text": "string"
}
```

**Response:**
```json
{
    "result": "good|bad|neutral",
    "joke": "string"  // Only included for negative sentiment
}
```

## Error Handling

- Frontend displays loading state during API calls
- Error messages shown if backend is unreachable
- Input validation on both frontend and backend
- Network error handling with user-friendly messages

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development Notes

- The application uses CORS to allow frontend-backend communication
- Sentiment analysis is performed using TextBlob's polarity scoring
- The backend runs on port 5000 by default
- Frontend makes API calls to `http://localhost:5000`

## Future Improvements

- Add user authentication
- Implement sentiment history
- Add more detailed sentiment analysis
- Include data visualization
- Add unit tests
- Implement rate limiting 