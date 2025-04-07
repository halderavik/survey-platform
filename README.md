# Survey Tool

A modern survey platform built with Next.js and Node.js.

## Project Structure

```
surveytool/
├── client/                 # Frontend (Next.js)
│   ├── src/
│   │   ├── app/           # Next.js app directory
│   │   │   ├── dashboard/ # Dashboard pages
│   │   │   │   └── surveys/ # Survey management
│   │   │   │       └── [id]/ # Dynamic survey routes
│   │   │   │           ├── edit/ # Survey editor
│   │   │   │           └── analytics/ # Survey analytics
│   │   │   └── survey/   # Survey taking pages
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
  - Real-time survey preview with step-by-step navigation
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
    - Conjoint Analysis
  - Question properties management
  - Draft saving functionality
  - Step-by-step preview mode with progress tracking
  - Mobile-responsive design

- Survey Management
  - Create and edit surveys
  - Save surveys as drafts
  - Preview surveys before publishing
  - Question validation
  - Required field handling
  - Survey status tracking (draft, testing, live)
  - Analytics dashboard for response tracking

- Database Integration
  - MongoDB with Mongoose ODM
  - Structured schemas for surveys, responses, and users
  - Efficient data validation
  - Type normalization

- Conjoint Analysis
  - File upload for conjoint data
  - Custom conjoint survey interface
  - Profile selection and choice tasks
  - Response collection and storage
  - Progress tracking
  - Multiple respondent support

- Analytics
  - Response summary dashboard
  - Response count metrics
  - CSV data export functionality
  - Response filtering capabilities

### Upcoming Features
- User authentication and authorization
- Advanced survey logic (branching, skip logic)
- Template system
- MaxDiff analysis module
- Advanced analytics visualizations

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