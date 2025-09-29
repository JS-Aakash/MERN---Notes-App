# MERN Notes App

A full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) that allows users to create, manage, and organize notes with calendar integration and recurrence options.

## 🌟 Features

### User Authentication
- User registration and login functionality
- JWT-based authentication system
- Secure password hashing with bcryptjs
- Protected routes and middleware

### Note Management
- Create, edit, and delete notes
- Optional note titles with required content
- Date-based note organization
- Recurrence options:
  - One-time notes
  - Daily recurring notes
  - Weekly recurring notes
  - Monthly recurring notes

### Calendar Integration
- Interactive calendar view using React Calendar
- Visual indicators for dates with notes
- Navigate between months and select specific dates
- Filter notes by selected date

### User Interface
- Responsive design for mobile and desktop
- Modern UI with Tailwind CSS
- Toast notifications for user feedback
- Modal forms for note creation/editing
- Drag and drop functionality for note cards

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling framework
- **React Calendar** - Calendar component
- **React Toastify** - Notification system
- **React Draggable** - Drag and drop functionality
- **JWT Decode** - Token decoding

## 📁 Project Structure

```
MERN---Notes-App/
├── backend/
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── noteController.js    # Note CRUD operations
│   ├── middlewares/
│   │   └── authMiddleware.js    # Authentication middleware
│   ├── models/
│   │   ├── User.js             # User model schema
│   │   └── Note.js             # Note model schema
│   ├── routes/
│   │   ├── authRoutes.js       # Authentication routes
│   │   └── noteRoutes.js       # Note-related routes
│   ├── package.json
│   └── server.js              # Express server setup
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AppCalendar.js  # Calendar component
│   │   │   ├── AuthForm.js     # Authentication form
│   │   │   ├── NoteCard.js     # Individual note display
│   │   │   └── NoteForm.js     # Note creation/editing form
│   │   ├── context/
│   │   │   └── AuthContext.js  # Authentication context
│   │   ├── pages/
│   │   │   ├── Auth.js         # Authentication page
│   │   │   └── Home.js         # Main dashboard
│   │   ├── App.js              # Main app component
│   │   ├── index.js            # App entry point
│   │   └── App.css
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
PORT=5000
```

Create a `.env` file in the `client` directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📖 Usage

### Authentication
1. **Register**: Create a new account with email and password
2. **Login**: Sign in with your credentials
3. **Logout**: End your session securely

### Managing Notes
1. **Create Note**: Click "Add Note" button, fill in the form with:
   - Title (optional)
   - Content (required)
   - Start Date
   - Recurrence pattern (one-time, daily, weekly, monthly)

2. **View Notes**: 
   - Use the calendar to navigate between dates
   - Dates with notes are marked with blue dots
   - Notes for the selected date are displayed in cards

3. **Edit Note**: Click the edit button on a note card to modify its content

4. **Delete Note**: Click the delete button to remove a note

### Calendar Features
- Navigate between months using arrow buttons
- Click on any date to view notes for that day
- Visual indicators show which dates have notes
- Responsive design works on mobile and desktop

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Notes
- `GET /api/notes` - Get user's notes (optional date filter)
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update existing note
- `DELETE /api/notes/:id` - Delete note

## 🗄️ Database Schema

### User Model
```javascript
{
  email: String (required, unique),
  password: String (required)
}
```

### Note Model
```javascript
{
  user: ObjectId (ref: 'User', required),
  title: String (default: ''),
  content: String (required),
  startDate: Date (required),
  recurrence: String (enum: ['one-time', 'daily', 'weekly', 'monthly'], required),
  timestamps: true
}
```

## 🎨 Styling

The application uses Tailwind CSS for styling with:
- Responsive grid layout
- Modern card-based design
- Interactive calendar component
- Modal forms for note management
- Toast notifications for user feedback
- Consistent color scheme and spacing

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes with middleware
- CORS configuration
- Input validation
- User-specific note isolation

## 🚀 Deployment

### Production Build

1. Build the frontend:
```bash
cd client
npm run build
```

2. The backend is configured to serve static files in production mode
3. Set `NODE_ENV=production` in your environment variables

### Environment Variables for Production
```env
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_secure_jwt_secret
NODE_ENV=production
PORT=5000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React Calendar component for the calendar functionality
- React Toastify for notification system
- Tailwind CSS for styling framework
- MongoDB Atlas for database hosting (if applicable)

## 🐛 Known Issues

- Calendar performance may be affected with large numbers of notes
- Recurrence logic handles basic patterns but may need enhancement for complex scenarios
- Mobile responsiveness may need further optimization

## 🔮 Future Enhancements

- Note categories and tags
- Rich text editor for note content
- Note sharing and collaboration
- File attachments for notes
- Search functionality
- Dark mode support
- Export notes to different formats
- Push notifications for recurring notes

---

Built with ❤️ using the MERN stack