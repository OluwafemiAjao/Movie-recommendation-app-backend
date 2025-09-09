// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Name is required"],
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       unique: true,
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       required: [true, "Password is required"],
//     },
//     favorites: [
//       {
//         movieId: {
//           type: Number,
//           required: true,
//         },
//       },
//     ],
//     watchlist: [
//       {
//         movieId: {
//           type: Number,
//           required: true,
//         },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);




const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    // ✅ Store raw movie IDs instead of objects
    favorites: [
      {
        type: Number,
        required: true,
      },
    ],
    watchlist: [
      {
        type: Number,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
