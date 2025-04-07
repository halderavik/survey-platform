# Survey Tool Server

This is the backend server for the Survey Tool application. It provides a RESTful API for managing surveys, responses, and user authentication.

## Features

- User authentication and authorization
- Survey creation and management
- Response collection and analysis
- Rate limiting and security measures
- MongoDB database integration
- JWT-based authentication
- Input validation and error handling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd surveytool/server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory with the following variables:
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/surveytool
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRATION=24h
```

4. Start MongoDB:
```bash
# Make sure MongoDB is running on your system
mongod
```

5. Start the development server:
```bash
npm run dev
```

The server will start on http://localhost:5000

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/verify-email/:token - Verify email
- POST /api/auth/forgot-password - Request password reset
- POST /api/auth/reset-password/:token - Reset password
- GET /api/auth/profile - Get user profile

### Surveys
- POST /api/surveys - Create a new survey
- GET /api/surveys - Get all surveys
- GET /api/surveys/:id - Get survey by ID
- PUT /api/surveys/:id - Update survey
- DELETE /api/surveys/:id - Delete survey
- PUT /api/surveys/:id/status - Change survey status
- GET /api/surveys/templates - Get survey templates

### Responses
- POST /api/responses - Submit survey response
- GET /api/responses/survey/:id - Get responses for a survey
- GET /api/responses/:id - Get response by ID
- PUT /api/responses/:id - Update response
- DELETE /api/responses/:id - Delete response

### Users
- GET /api/users/profile - Get user profile
- PUT /api/users/profile - Update user profile
- PUT /api/users/password - Change password

## Error Handling

The API uses standard HTTP status codes and returns errors in the following format:
```json
{
  "message": "Error message",
  "errors": [
    {
      "field": "fieldName",
      "message": "Field-specific error message"
    }
  ]
}
```

## Security

- All endpoints except registration and login require authentication
- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- Rate limiting is implemented to prevent abuse
- CORS is configured to allow requests only from the frontend
- Helmet is used to set security headers
- Input validation is performed on all requests

## Development

To run the server in development mode with hot reloading:
```bash
npm run dev
```

## Testing

To run tests:
```bash
npm test
```

## Production

To run the server in production mode:
```bash
npm start
```

Make sure to:
1. Set NODE_ENV to 'production'
2. Use a strong JWT_SECRET
3. Configure proper MongoDB URI
4. Set up proper CORS settings
5. Enable rate limiting
6. Set up proper logging

## License

This project is licensed under the MIT License. 