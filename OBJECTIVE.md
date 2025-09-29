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
- Allows authenticated users to add, remove, and retrieve their list of favorite movies by movie ID: Add to favorites, Remove from favorites, Get list of favorite movie IDs
- CRUD-style design (create, read, delete)

#### 📺 Watchlist
- Allows authenticated users to manage their personal movie watchlists
- Supports add, remove, and view functionality: Add to watchlist, Remove from watchlist, Get all movies in watchlist

#### 📝 Reviews
- Enables users to add or update their review (rating + comment) for a movie
- Retrieve reviews by movie: Retrieve all reviews for a movie
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
├── controllers/         # Route logic for modules # Route handlers (auth, user, movie, etc.)
│   └── authController.js, movieController.js, etc.
├── middleware/          # Auth + error handling. **authMiddleware**: Protects routes with JWT
│   └── authMiddleware.js, errorMiddleware.js
├── models/              # Mongoose schemas (User, Review)
├── routes/              # Express routers # All API route definitions
│   └── authRoutes.js, movieRoutes.js, etc.
├── services/            # TMDB API handlers/logic with axios (e.g. tmdbService.js) # Business logic for TMDB integration **tmdbService**: Central TMDB API request logic
├── utils/               # Utility functions (e.g. token generation) # JWT functions (sign/verify), error helpers
│   └── jwt.js (token logic), errorHandler.js, etc.
├── server.js            # App entry point
├── .env                 # Environment variables # Environment config file
└── README.md            # Project overview/documentation (this file)
```

---

## ⚙️ Setup Instructions
For easier followup, I see it that you are meant to start the buildup of the app of this backend in particular 
from installing dependencies
to .env
to utils (it needs JWT_SECRET from .env, and module - jsonwebtoken)
to services (it needs module - axios)
to models (it needs module - mongoose)
to middleware (which only the auth part needs both user models and verify utils, and also needs module - express-async-handler (though optional if you want to adopt only try/catch)) 
to controllers (which the auth needs both generate utils and user models in addition to module - bcrypt, discover needs only services, favorite needs only user models, genre needs only services, movie needs only services (but this time, it needs not just one, but almost all services), profile needs only user models, review needs only review models, and watchlist needs only user models) 
to routes (auth, favorite, profile, review, and watchlist each needs both controllers and auth middleware, while the remaining 3 needs only controllers. However, each requires both modules - express and router)
to config (it needs module - mongoose)
back to .env 
to server.js (it needs dotenv, config, routes, and error middleware, and also needs modules - express and cors)
to README.
Once done with the frontend, then move to the backend.

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
## 4. Available Scripts
For the non-dependencies, they are available scripts so either define them manually (though, test which is optional can be generated as the only script in package.json along with other packages when you initialize npm init (or better still use npm init -y) in the terminal) in the package.json file/configuration, or use the command line interface CLI method (advanced) / run terminal commands, which these scripts must be present for npm start (though, node server.js which requires server.js to be properly setup can still run without defining it as "start" in the script), or npm run dev (though, nodemon server.js which is for you not to be repeating running either npm start or node server.js in the console purpose is to let the server keep running automatically requires nodemon installed in addition to server.js being properly setup can still run without defining it as "dev" in the script as long as nodemon is installed), or npm test to work. It should also be noted that npm start / node server.js is required during real production as it is not used only for testing, while npm run dev / nodemon server.js is for testing or local development and not required during real production or real world condition.
- For the package.json configuration, define them as: 
"scripts": {
  "dev": "nodemon server.js",
  "start": "node server.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
where, "dev" is great for local development with live reloading.
"start" is used in production (Heroku, Render, etc.).
"test" is optional. It’s a placeholder by default when you initialize npm init. 

- For the CLI method (advanced), you can use npm pkg set to add scripts one by one: 
npm pkg set scripts.dev="nodemon server.js"
npm pkg set scripts.start="node server.js"
npm pkg set scripts.test="echo \"Error: no test specified\" && exit 1"

In the project directory, you can run:
### 4. `npm start`

Runs the backend server using Node (no live reload). Recommended for production environments.

### `npm test`

Currently a placeholder script. You can customize this later for actual unit tests.

### `npm run dev`

Starts the development server using `nodemon` for live reloading. Useful during development. 

> Make sure `nodemon` is installed as a dev dependency. If you're using nodemon for npm run dev, you need to install it using:
> ```
> npm install --save-dev nodemon
> ```

<!-- # 5. Metadata and other packages of package.json --> -->
When you run npm init -y in the terminal, it gives you one block (metadata) for the parent name or package name of your folder, version of the node/npm of your backend, and main which is the entry point of your backend app (it can be server.js or index.js, or whatever you named it), another block for scripts, and another block for the keywords, author, license, and description.
In addition, if you want to use import instead of const, define type to be module, specifically in the metadata block.


### 🧪/🚪 Sample `.env` File

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
|             | DELETE | /api/favorites/:movieId         | Remove movie from favorites                        | ✅              | movieId (URL param) or movieId (param)   |
| Watchlist   | POST   | /api/watchlist                  | Add movie to watchlist                             | ✅              | movieId                                  |
|             | GET    | /api/watchlist                  | Get full watchlist                                 | ✅              | –                                        |
|             | DELETE | /api/watchlist/:movieId         | Remove movie from watchlist                        | ✅              | movieId (URL param)                      |
| Reviews     | POST   | /api/reviews                    | Add/update review (by movie)                       | ✅              | movieId, rating, comment                 |
|             | GET    | /api/reviews/:movieId           | Get all reviews for a specific movie               | ❌              | movieId (URL param)                      |
|             | DELETE | /api/reviews/:reviewId          | Delete your own review or Delete review by ID      | ✅              | reviewId (URL param)                     |
| Movies      | GET    | /api/movies/popular             | Get popular movies or Fetch list of popular movies from TMDB  | ❌   | –                                        |
|             | GET    | /api/movies/search              | Search movies by keyword or query                  | ❌        | q (query param) or query param: `?q=batman`    |
|             | GET    | /api/movies/category/:category  | Get movies by category (e.g. top_rated, upcoming)  | ❌              | category or category param               |
|             | GET    | /api/movies/discover            | Discover movies with filters (sort, rating, etc.)  | ❌              | sort_by, with_genres, release_year, etc. |
|             | GET    | /api/movies/:id                 | Get movie details by ID                            | ❌              | id (param)                               |
|             | GET    | /api/movies/:id/videos          | Get movie videos (trailers, clips, etc.)           | ❌              | id (param)                               |
|             | GET    | /api/movies/:id/similar         | Get similar movies based on a movie ID             | ❌              | id (param)                               |
| Genres      | GET    | /api/genres                     | Retrieve list of all genres from TMDB              | ❌              | –                                        |
|Misc/Healthcheck| GET | /                               | Health check route or Root endpoint - returns status message | ❌    | –                                        |

// Auth required should mean must be logged in

---

## Change Password

### Body Parameters
- `currentPassword`: string (required)
- `newPassword`: string (required)

### Notes
#### Middleware (AuthMiddleware)
- User must be authenticated via JWT
- express-async-handler used to streamline async error catching

#### Controller-level / Business logic validation
- Validates current password before allowing change. Validates currentPassword against stored hash
- Only then allows update to newPassword

---

## ⚙️ Service Layer (`services/tmdbService.js`)

- Centralizes all TMDB API requests to ensure maintainability and error handling. It handles TMDB API integration with centralized error handling. 
- The service abstracts and centralizes external API communication. It handles all external calls to TMDB API. Central error handling & clean parameterized requests.

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
- API response code checks or Checks for non-200 response codes
- Axios exception handling or Catches Axios/network exceptions

---

## 🔧/🧩 Utils Layer (`utils/`)

- `jwt.js`: Handles JWT creation and verification operations
- Centralized JWT logic used across authController and authMiddleware
- `errorMiddleware.js`: Global error formatting middleware/handler

---

## 🧠/🧐 Notes & Design

### Authentication & Security
- All protected routes use middleware `protect` from `authMiddleware.js` which validates JWT
- Passwords are hashed using `bcrypt`

### Controller Design
- Controllers are lightweight: only handle HTTP & forward HTTP logic to services(Controllers focus on handling req/res cycle). Controllers are kept slim by offloading or delegating external calls or API logic to the **services** layer. 

### REST Principles
- REST API design principles followed. Each resource follows REST conventions
- Consistent HTTP methods and responses. Consistent naming, separation of concerns

### CORS
- Applied globally in server.js to handle cross-origin requests or Global CORS middleware applied in server.js.

### Movie, Genre, and Review Modules
- Movies, genres, reviews are all fetched or managed per user session. Movie data (videos, details, genres, etc.) is fetched dynamically from **TMDB** via `tmdbService.js`.

---

## 🧪 Sample Discover Movies Request

```http
GET /api/movies/discover?sort_by=popularity.desc&with_genres=28&primary_release_year=2024&vote_average.gte=7
```

---

## 🔮 Future Enhancements (Optional)

- Admin features/panel (manage users, delete reviews)
- Movie pagination (for movie results) and caching. Pagination and infinite scroll support
- Rate limiting and security headers. Rate limiting & IP filtering
- Email verification / password reset
- Dark mode frontend toggle

---

## 📩 Contact

For questions or contributions, contact:  
**Oluwafemi Ajao**  
📧 Starrylive007@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/your-profile)
