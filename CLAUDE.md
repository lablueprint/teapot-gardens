# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Teapot Gardens is a React Native mobile application built with Expo for LA Blueprint. The app features a gamification system (garden-based plant growth) where users earn XP by attending community events and can grow multiple plant types at different levels.

## Tech Stack

- **Frontend**: React Native with Expo (v52), Expo Router for navigation
- **Backend**: Node.js with Express and MongoDB (Mongoose ODM)
- **UI Components**: React Native components with custom styling, Ionicons
- **State Management**: React Context (AuthContext) for user auth, SecureStore for persistent auth
- **Authentication**: Bcrypt password hashing with pre-save hooks

## Development Setup

### Frontend (React Native/Expo)
```bash
# Install dependencies
npm install

# Start development server with tunnel (recommended for testing on physical devices)
npx expo start --tunnel

# Platform-specific commands
npm run android    # Start on Android emulator
npm run ios       # Start on iOS simulator
npm run web       # Start web version
```

### Backend (Express/MongoDB)
```bash
cd backend

# Install dependencies
npm install

# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

**Environment Variables**:
- Backend `.env` in `backend/` directory needs:
  - `MONGO_URI` - MongoDB connection string
  - `PORT` - Server port (typically 4000)
- Frontend `.env` in `app/` directory (configure ngrok URL for API calls)

## Project Architecture

### Frontend Structure (`/app`)

The app uses **Expo Router** for file-based navigation. Key architectural patterns:

- **Navigation**: Custom drawer navigator in `app/src/components/hamburgermenu.jsx` wraps all screens, includes user profile photo and QR code at top
- **Authentication**: `AuthContext` provider in `app/context/AuthContext.jsx` manages user state via SecureStore
- **Path Aliases**: Configured in `jsconfig.json`:
  - `@screens/*` → `app/screens/*`
  - `@app/*` → `app/*`
  - `@assets/*` → `assets/*`

**Main Screens**:
- `app/screens/homepage/homepage.jsx` - User dashboard with plant display, FlatList carousels for upcoming/monthly events
- `app/screens/login/login.jsx` + `signin.jsx` - Authentication flow with onboarding carousel
- `app/screens/garden/garden.jsx` + `nursery.jsx` - Plant selection and garden management (PlantContext)
- `app/screens/discover/discover.jsx` - Browse programs with grid/list view toggle
- `app/screens/profile/profile_page.jsx` - User profile with QR code and edit capabilities
- `app/screens/program_page/program_page.jsx` - Program details with event lists and admin creation
- `app/screens/event/event_page.jsx` - Event details with registration modal, analytics, attendee lists
- `app/screens/notification/notification_page.jsx` - User notifications
- `app/screens/admin_dashboard/admin_dashboard.jsx` - Admin event/program management

**Key Features**:
- QR code generation and scanning for event check-ins
- Multi-plant garden system with 3 plant types, 3 levels each (locked/unlocked states)
- Event registration with modals and real-time attendee tracking
- Event analytics with charts (for admins)
- CSV export functionality for event attendee data with demographics
- Community photos upload for events
- Program following with grid/list view options

### Backend Structure (`/backend`)

Standard Express MVC pattern with MongoDB:

**Models** (`/backend/models/`):
- `UserModel.js` - User schema with bcrypt password hashing (pre-save hook), authentication methods, demographics, notifications array, tamagotchi fields
- `ProgramModel.js` - Community programs with event lists, followers, name, and description
- `EventModel.js` - Events with attendee lists, XP rewards, custom eventID, pictures array, volunteer tracking

**Controllers** (`/backend/controllers/`):
- `userController.js` - CRUD + authentication (login/signup with password comparison), event registration, demographic updates
- `programController.js` - Program CRUD operations
- `eventController.js` - Event CRUD, volunteer management, attendee tracking, analytics endpoints

**Routes** (`/backend/routes/`):
- `/api/users` - User auth, CRUD, event registration
- `/api/programs` - Program CRUD
- `/api/events` - Event CRUD, volunteer ops, analytics, CSV export

**Important Patterns**:
- User model has `pre('save')` hook for password hashing and `comparePassword()` method for authentication
- `$addToSet` prevents duplicate entries in arrays (attendingEvents, volunteers, etc.)
- Custom `eventID` field in events for QR code scanning (separate from MongoDB `_id`)

## Key Relationships

1. **Users ↔ Events**:
   - Users have `attendingEvents` (registered) and `attendedEvents` (checked in)
   - Events have `attendeeList` array and `volunteers` array

2. **Users ↔ Programs**:
   - Users have `followedPrograms` array (program IDs)
   - Programs have `followList` array (user IDs)

3. **Programs ↔ Events**:
   - Programs have `upcomingEvents` and `pastEvents` arrays (event IDs)
   - Events reference parent program via `admin` field (program admin ID)

4. **Garden/Plant System**:
   - Users have `tamagatchiXP` (total XP), `tamagatchiLevel` (current level), `tamagatchiType` (selected plant)
   - Users earn XP from attended events (`Event.XP` field)
   - 3 plant types with 3 growth levels each (9 total plant images in `assets/garden-assets/`)
   - PlantContext manages plant selection state

5. **Authentication Flow**:
   - User credentials stored in SecureStore (expo-secure-store)
   - AuthContext provides user state globally
   - Backend password hashing with bcrypt on save

## Common Development Patterns

- **Navigation**: Use `useNavigation()` hook from `@react-navigation/native`, then `navigation.navigate("ScreenName", params)`
- **Authentication**: Access user via `useContext(AuthContext)` to get current user data
- **Styling**: Most screens have companion `*_style.jsx` files with StyleSheet definitions
- **API Calls**: Use `axios` with ngrok URL (defined at top of files like homepage). Update ngrok URL when testing
- **Event Cards**: Use `<Event {...eventData} />` component which includes Pressable wrapper with navigation to EventPage
- **CSV Export**: Use `GET /api/events/:eventId/export` to download event data. Frontend uses expo-file-system + expo-sharing for mobile downloads
- **QR Codes**:
  - Member QR codes displayed in hamburger menu (user `_id`)
  - Event check-ins use event QR codes with `eventID` (not `_id`) scanned by admin_scanner.jsx
- **Date/Time Parsing**: Homepage includes logic to move past events from `attendingEvents` to `attendedEvents` based on date comparison

## Notes

- Homepage automatically filters events into "This Month's Events" based on current date
- Old directory structure (`app/discover/`, `app/profile/`) was deleted in favor of `app/screens/`
- `app/index.jsx` serves as a development navigation menu with links to all screens
- No linting or testing infrastructure is currently configured
- Backend uses MongoDB ObjectIds (`_id`) for most relationships, stored as strings in arrays
- Events also have custom `eventID` field for QR code functionality (UUID-style string)
- User demographics tracked: race, incomeLevel, age, genderIdentification (added for analytics)
