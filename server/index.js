require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./db/connectDB");
const userRoutes = require("./routes/user.route");
const bookRoutes = require("./routes/book.routes");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/user", userRoutes);
app.use("/api/book", bookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
