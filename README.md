# SecureSight Dashboard

A comprehensive CCTV monitoring software dashboard built with Next.js 15, Prisma, and Tailwind CSS. This project was developed as part of a fullstack developer internship technical assessment.

## 📋 Features

- **Real-time Incident Monitoring**: View and manage security incidents across multiple cameras
- **Interactive Dashboard**: Live incident player with camera feeds and thumbnails  
- **Incident Management**: Resolve incidents with optimistic UI updates
- **24-Hour Timeline**: Visual timeline showing incident distribution throughout the day
- **Responsive Design**: Fully responsive interface matching Figma specifications
- **Database Integration**: SQLite database with Prisma ORM
- **RESTful API**: Clean API endpoints for incident management

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Lucide React (icons)
- **Database**: SQLite (with Prisma ORM)
- **Deployment**: Vercel (recommended)
- **Development**: ESLint, TypeScript

## 📁 Project Structure

```
securesight-dashboard/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts               # Database seeding script
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Main dashboard page
│   ├── components/           # React components
│   └── lib/                  # Utility functions
├── public/                   # Static assets
└── README.md
```

## 💻 Windows Setup Instructions

### Prerequisites

1. **Install Node.js**
   - Download Node.js 18+ from https://nodejs.org/
   - Choose the LTS version (Long Term Support)
   - Run the installer and follow the setup wizard
   - Verify installation by opening Command Prompt and running:
     ```cmd
     node --version
     npm --version
     ```

2. **Install Git** (if not already installed)
   - Download from https://git-scm.com/download/win
   - Install with default settings

### Step-by-Step Installation

1. **Extract the Project**
   ```cmd
   # Extract the securesight-dashboard.zip file to your desired location
   # Open Command Prompt and navigate to the project folder
   cd path/to/securesight-dashboard
   ```

2. **Install Dependencies**
   ```cmd
   npm install
   ```

3. **Set Up Environment Variables**
   ```cmd
   # Copy the example environment file
   copy .env.example .env

   # The .env file should contain:
   # DATABASE_URL="file:./dev.db"
   ```

4. **Initialize Database**
   ```cmd
   # Generate Prisma client
   npx prisma generate

   # Create and migrate database
   npx prisma db push

   # Seed the database with sample data
   npm run db:seed
   ```

5. **Start Development Server**
   ```cmd
   npm run dev
   ```

6. **Open Browser**
   - Navigate to http://localhost:3000
   - You should see the SecureSight dashboard with sample incidents

### Build for Production

```cmd
# Build the application
npm run build

# Start production server
npm start
```

## 🗄️ Database Commands

```cmd
# View database in browser
npm run db:studio

# Reset and reseed database
npx prisma db push --force-reset
npm run db:seed

# Generate Prisma client after schema changes
npx prisma generate
```

## 🌐 API Endpoints

### GET `/api/incidents`
Fetch incidents with optional filtering:
```javascript
// Get all unresolved incidents (default)
GET /api/incidents?resolved=false

// Get all incidents
GET /api/incidents
```

### PATCH `/api/incidents/[id]/resolve`
Mark an incident as resolved:
```javascript
PATCH /api/incidents/1/resolve
```

## 🎨 Component Overview

### `<Navbar />`
Top navigation with SecureSight branding and navigation links.

### `<IncidentPlayer />`
Main video player showing selected incident with camera thumbnails.

### `<IncidentList />`
Right sidebar displaying unresolved incidents with resolve functionality.

### `<IncidentTimeline />`
24-hour timeline visualization of incidents with interactive markers.

## 📦 Deployment

### Deploying to Vercel

1. **Push to GitHub**
   ```cmd
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/securesight-dashboard.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Visit https://vercel.com/
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your repository
   - Set environment variables:
     - `DATABASE_URL`: Use a cloud database URL (Supabase, PlanetScale, etc.)
   - Deploy!

### Environment Variables for Production

For production deployment, update your `.env` or Vercel environment variables:

```env
# For SQLite (local development only)
DATABASE_URL="file:./dev.db"

# For PostgreSQL (recommended for production)
DATABASE_URL="postgresql://user:password@host:port/database"

# For MySQL
DATABASE_URL="mysql://user:password@host:port/database"
```

## 🐛 Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   ```cmd
   # Kill process on port 3000
   netstat -ano | findstr :3000
   taskkill /PID <process_id> /F

   # Or use a different port
   npm run dev -- -p 3001
   ```

2. **Database connection issues**
   ```cmd
   # Reset database
   npx prisma db push --force-reset
   npm run db:seed
   ```

3. **Module not found errors**
   ```cmd
   # Clear node_modules and reinstall
   rmdir /s node_modules
   del package-lock.json
   npm install
   ```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

### Tech Decisions

1. **Next.js 15 App Router**: Latest features, server components, and better performance
2. **Prisma ORM**: Type-safe database access and easy migrations
3. **SQLite**: Simple setup for development, easily switchable to PostgreSQL/MySQL
4. **Tailwind CSS**: Rapid styling with design system consistency
5. **TypeScript**: Type safety and better developer experience

## 🚀 If I Had More Time...

- **Authentication**: User login/logout with NextAuth.js
- **Real-time Updates**: WebSocket integration for live incident updates
- **Advanced Filtering**: Search and filter incidents by date, type, camera
- **Video Streaming**: Integration with actual CCTV camera feeds
- **Export Functionality**: PDF reports and CSV data export
- **Mobile App**: React Native companion app
- **AI Integration**: Automated incident detection and classification
- **Multi-tenant Support**: Support for multiple organizations
- **Audit Logging**: Track all user actions and system events
- **Performance Optimization**: Implement caching and lazy loading

## 📄 License

This project is developed for educational and assessment purposes.

## 📞 Support

For any issues or questions, please check the troubleshooting section or create an issue in the repository.
