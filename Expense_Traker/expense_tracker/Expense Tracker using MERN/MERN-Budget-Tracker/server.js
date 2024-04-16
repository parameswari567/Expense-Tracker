const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");
const cors = require("cors");

const transactions = require("./routes/api/transactions");
const users = require("./routes/api/users");

const app = express();

// Bodyparser Middleware
app.use(express.json());

// Allow cross-origin access
app.use(cors());

// DB Config
const db = config.get("MONGO_URI");

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.log(err));

// Use Routes
app.use("/api/transactions", transactions);
app.use("/api/users", users);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port: ${port}`));
