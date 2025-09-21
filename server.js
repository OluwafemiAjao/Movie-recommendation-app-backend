const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const genreRoutes = require("./routes/genreRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userProfileRoutes = require("./routes/profileRoutes");
const discoverRoutes = require("./routes/discoverRoutes"); // 

connectDB();

const app = express();

// Middleware
// app.use(cors());
// ✅ Deployment-safe CORS setup
const allowedOrigins = [
  "http://localhost:5173", // local frontend (Vite default)
  // "https://your-frontend.vercel.app" // replace with your real deployed frontend
  "https://starflix-beta.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.use(express.json());

// ROUTES 
// HOME (Optional, often useful for testing base API status)
app.get("/", (req, res) => {
  res.send("Welcome to the Movie Recommendation API");
});

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userProfileRoutes);
app.use("/api/discover", discoverRoutes); // 

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Server || Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
