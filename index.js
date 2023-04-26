const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const env = require("dotenv");

const userRoute = require("./Routes/userRoute");

const app = express();
env.config();

app.use(express.json());
app.use(cors());
app.use("/api/v1", userRoute);

const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

app.listen(port, (req, res) => {
  console.log(`app running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Finebank APIs");
});

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connection established"))
  .catch((error) => console.log("MongoDB connection failed: ", error.message));
