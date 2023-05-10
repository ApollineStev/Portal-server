require("dotenv").config();
require("./db");

const express = require("express");
const app = express();
require("./config")(app);

const { isAuthenticated } = require("./middleware/jwt.middleware");

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/user", isAuthenticated, userRoutes);

const postRouter = require("./routes/post.routes");
app.use("/posts", isAuthenticated, postRouter);

const commentRouter = require("./routes/comment.routes");
app.use("/api", isAuthenticated, commentRouter);

const quizRouter = require("./routes/quiz.routes");
app.use("/api", isAuthenticated, quizRouter);

// 🍊route for search?

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
