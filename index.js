const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const dbConnect = require("./dbConnect");
const authRouter = require("./routers/authRouter");
const postsRouter = require("./routers/postsRouter");
const userRouter = require("./routers/userRouter");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

dotenv.config({ path: "./.env" });

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(morgan("common"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000", // dynamic for prod
  })
);

// API routes
app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/user", userRouter);

// Serve frontend build (React/Vue/Next static build)
const frontendPath = path.join(__dirname, "../frontend/build");
app.use(express.static(frontendPath));

// Catch‑all route to serve index.html for SPA
app.get("*", (req, res) => {
  res.sendFile(path.resolve(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 4000;

// Connect DB and start server
dbConnect();
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
