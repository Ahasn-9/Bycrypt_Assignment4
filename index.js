const mongoose = require("mongoose");
const express = require("express");
const app = express();
const User = require("./models/user");

mongoose
  .connect("mongodb://localhost:27017/bcrypt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  res.send(req.body);
});

app.get("/secret", (req, res) => {
  res.send("This is a secret page, you can only see this if you are logged in");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
