# Survey Tool

A modern survey platform built with Next.js and Node.js.

## Project Structure

```
surveytool/
├── client/                 # Frontend (Next.js)
│   ├── src/
│   │   ├── app/           # Next.js app directory
│   │   │   ├── survey-builder/    # Survey builder pages
│   │   │   │   └── [id]/         # Dynamic survey builder route
│   │   ├── components/    # React components
│   │   │   ├── ui/       # Reusable UI components
│   │   │   └── survey/   # Survey-specific components
│   │   ├── lib/          # Utility libraries
│   │   ├── hooks/        # Custom React hooks
│   │   ├── utils/        # Helper functions
│   │   ├── styles/       # Global styles
│   │   ├── types/        # TypeScript types
│   │   ├── services/     # API services
│   │   ├── store/        # State management
│   │   └── config/       # Configuration files
│   ├── public/           # Static files
│   └── package.json      # Frontend dependencies
│
├── server/                # Backend (Node.js/Express)
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # Database models
│   │   │   ├── survey.model.js    # Survey schema
│   │   │   ├── response.model.js  # Response schema
│   │   │   └── user.model.js      # User schema
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Custom middleware
│   │   ├── services/     # Business logic
│   │   ├── utils/        # Helper functions
│   │   ├── config/       # Configuration files
│   │   └── validators/   # Request validation
│   └── package.json      # Backend dependencies
│
└── README.md             # Project documentation
```

## Features

### Implemented Features
- Survey Builder
  - Modern, intuitive interface
  - Real-time survey preview
  - Multiple question types:
    - Multiple Choice
    - Checkbox
    - Short Text
    - Long Text
    - Rating Scale
    - Dropdown
    - Matrix
    - Slider
    - Date
    - File Upload
  - Question properties management
  - Draft saving functionality
  - Step-by-step preview mode
  - Mobile-responsive design

- Survey Management
  - Create and edit surveys
  - Save surveys as drafts
  - Preview surveys before publishing
  - Question validation
  - Required field handling

- Database Integration
  - MongoDB with Mongoose ODM
  - Structured schemas for surveys, responses, and users
  - Efficient data validation
  - Type normalization

### Upcoming Features
- User authentication and authorization
- Advanced survey logic
- Response collection and analytics
- Template system
- Data export capabilities
- MaxDiff and Conjoint analysis modules

## Tech Stack

### Frontend
- Next.js 14
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Query
- Zustand

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- Express Validator

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/surveytool.git
cd surveytool
```

2. Install frontend dependencies
```bash
cd client
npm install
```

3. Install backend dependencies
```bash
cd ../server
npm install
```

4. Set up environment variables
- Create `.env` files in both client and server directories
- Copy the example env files and update the values

5. Start the development servers

Frontend:
```bash
cd client
npm run dev
```

Backend:
```bash
cd server
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 