// README.md - placeholder content
# 🎬 Movie Recommendation App - Backend

This is the backend of the Movie Recommendation Application. It is a **Node.js + Express API** that integrates with **MongoDB** and **The Movie Database (TMDB) API** to provide rich movie data. It supports features like user authentication, favorites, watchlist management, movie discovery, user reviews, and dynamic genre fetching.

---

## 🧩 Backend Module Overview

### 🔐 Auth Module
- Manages user registration, login, and secure password change.
- Implements JWT-based authentication and bcrypt password hashing.

### 👤 Profile Module
- Allows logged-in users to view and update their profile data.

### ❤️ Favorite Module
- Authenticated users can add, remove, and retrieve a list of favorite movie IDs.

### 📺 Watchlist Module
- Enables users to manage their personal movie watchlists.

### 📝 Review Module
- Users can add/update/delete reviews for movies, including ratings and comments.

### 🎞️ Movie Module (TMDB Integration)
- Interfaces with TMDB to fetch movie data dynamically.
- Includes popular movies, search, details, videos, similar movies, categories, and discovery with filters.

### 🎭 Genre Module
- Dynamically retrieves genre list from TMDB API.

---

## 🚀 Features

### 🔐 Authentication (JWT-based)
- Secure user registration and login with JSON Web Tokens JWT
- Password hashing using bcrypt
- Secure password change with current password validation (Secure Password Update)

### User Features

#### 👤 User Profile
- Get/retrieve and update the current logged-in user’s profile
- Secured via JWT middleware or Uses token-based access (`/me`)

#### ❤️ Favorites
- Allows authenticated users to add, remove, and retrieve their list of favorite movies by movie ID
- CRUD-style design (create, read, delete)

#### 📺 Watchlist
- Allows authenticated users to manage their personal movie watchlists
- Supports add, remove, and view functionality: Add to watchlist, Remove from watchlist, Get all movies in watchlist

#### 📝 Reviews
- Enables users to add or update their review (rating + comment) for a movie
- Retrieve reviews by movie
- Delete review (only own review)

#### 🎞️ Movies (Powered by TMDB)
- Fetch popular movies
- Search movies by keyword/query
- Get movie details by TMDB ID
- Get movie videos (trailers, clips)
- Get similar movies
- Get movies by category (e.g., top_rated, upcoming)
- Discover movies (filters: sort_by, genre, release_year, rating)

#### 🎭 Genres
- Retrieve the list of all movie genres from TMDB dynamically or Fetch genres dynamically from TMDB

### ✅ Health Check
Base route / returns a welcome or status message

---

## 🧱 Folder/Project Structure

```
/backend
│
├── config/              # MongoDB connection setup (db.js)
├── controllers/         # Route logic for modules (auth, user, movie, etc.)
│   └── authController.js, movieController.js, etc.
├── middleware/          # Auth + error handling. 
│   └── authMiddleware.js, errorMiddleware.js
├── models/              # Mongoose schemas (User, Review)
├── routes/              # Express routers # All API route definitions
│   └── authRoutes.js, movieRoutes.js, etc.
├── services/            # TMDB API handlers/logic with axios (e.g. tmdbService.js) 
├── utils/               # Utility functions (e.g. token generation) 
│   └── jwt.js (token logic), errorHandler.js, etc.
├── server.js            # App entry point
├── .env                 # Environment variables 
└── README.md            # Project overview/documentation (this file)
```

---

## ⚙️ Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/your-repo/movie-app-backend.git
cd movie-app-backend

# 2. Install dependencies
npm install

# 3. Create a .env file using the template below

# 4. Start the development server
npm run dev
```

### 🧪 Sample `.env` File

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/movie_app
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_api_key
NODE_ENV=development
```

> Dependencies include: `express`, `mongoose`, `dotenv`, `axios`, `bcryptjs`, `jsonwebtoken`, `cors`, `express-async-handler`

---

## 🔌 API Endpoints Overview

| Module      | Method | Endpoint                        | Description                                        | Auth Required | Params / Body                            |
|-------------|--------|----------------------------------|----------------------------------------------------|----------------|------------------------------------------|
| Auth        | POST   | /api/auth/register              | Register new user                                  | ❌              | name, email, password                    |
|             | POST   | /api/auth/login                 | Login and return jsonwebtoken JWT                  | ❌              | email, password                          |
|             | POST   | /api/auth/change-password       | Change password (must know current)                | ✅              | currentPassword, newPassword             |
| Profile     | GET    | /api/users/me                   | Get current user's profile                         | ✅              | –                                        |
|             | PUT    | /api/users/me                   | Update user profile                                | ✅              | name, email, etc.                        |
| Favorites   | POST   | /api/favorites                  | Add movie to favorites                             | ✅              | movieId                                  |
|             | GET    | /api/favorites                  | Retrieve or get list of favorite movie IDs         | ✅              | –                                        |
|             | DELETE | /api/favorites/:movieId         | Remove movie from favorites                        | ✅              | movieId (URL param)                      |
| Watchlist   | POST   | /api/watchlist                  | Add movie to watchlist                             | ✅              | movieId                                  |
|             | GET    | /api/watchlist                  | Get full watchlist                                 | ✅              | –                                        |
|             | DELETE | /api/watchlist/:movieId         | Remove movie from watchlist                        | ✅              | movieId (URL param)                      |
| Reviews     | POST   | /api/reviews                    | Add/update review (by movie)                       | ✅              | movieId, rating, comment                 |
|             | GET    | /api/reviews/:movieId           | Get all reviews for a specific movie               | ❌              | movieId (URL param)                      |
|             | DELETE | /api/reviews/:reviewId          | Delete your own review                             | ✅              | reviewId (URL param)                     |
| Movies      | GET    | /api/movies/popular             | Get popular movies                                 | ❌              | –                                        |
|             | GET    | /api/movies/search              | Search movies by keyword or query                  | ❌              | q (query param)                          |
|             | GET    | /api/movies/category/:category  | Get movies by category (e.g. top_rated, upcoming)  | ❌              | category                                 |
|             | GET    | /api/movies/discover            | Discover movies with filters (sort, rating, etc.)  | ❌              | sort_by, with_genres, release_year, etc. |
|             | GET    | /api/movies/:id                 | Get movie details by ID                            | ❌              | id (param)                               |
|             | GET    | /api/movies/:id/videos          | Get movie videos (trailers, clips, etc.)           | ❌              | id (param)                               |
|             | GET    | /api/movies/:id/similar         | Get similar movies based on a movie ID             | ❌              | id (param)                               |
| Genres      | GET    | /api/genres                     | Retrieve list of all genres from TMDB              | ❌              | –                                        |
| Misc        | GET    | /                               | Health check route                                 | ❌              | –                                        |

---

## ⚙️ Service Layer (`services/tmdbService.js`)

- Centralizes all TMDB API requests to ensure maintainability and error handling.  

### Key Functions:
- `fetchFromTMDB(endpoint, params)`
- `fetchPopularMovies()`
- `fetchMovieDetails(id)`
- `searchMovies(query)`
- `getMovieVideos(id)`
- `getSimilarMovies(id)`
- `getMoviesByCategory(category)`
- `discoverMovies(queryParams)`

### ✅ Built-in Error Handling:
- API key validation/existence
- API response code checks 
- Axios exception handling 

---

## 🔧 Utils Layer (`utils/`)

- `jwt.js`: Handles JWT creation and verification operations
- Centralized JWT logic used across authController and authMiddleware
- `errorMiddleware.js`: Global error formatting middleware/handler

---

## 🧠 Notes & Design

### Authentication & Security
- All protected routes use middleware `protect` from `authMiddleware.js` which validates JWT
- Passwords are hashed using `bcrypt`

### Controller Design
- Controllers are lightweight: only handle HTTP & forward HTTP logic to services(Controllers focus on handling req/res cycle) 

### REST Principles
- REST API design principles followed
- Consistent HTTP methods and responses

### CORS
- Applied globally in server.js to handle cross-origin requests 

---

## 🧪 Sample Discover Movies Request

```http
GET /api/movies/discover?sort_by=popularity.desc&with_genres=28&primary_release_year=2024&vote_average.gte=7
```

---

## 🔮 Future Enhancements (Optional)

- Admin features/panel (manage users, delete reviews)
- Movie pagination (for movie results) and caching
- Rate limiting and security headers
- Email verification / password reset
- Dark mode frontend toggle

---

## 📩 Contact

For questions or contributions, contact:  
**Oluwafemi Ajao**  
📧 Starrylive007@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/your-profile)