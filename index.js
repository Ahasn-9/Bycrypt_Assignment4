const mongoose = require("mongoose");
const express = require("express");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");

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

app.get("/", (req, res) => {
  res.send("This is home page");
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const user = new User({
    username,
    password: hash,
  });
  await user.save();
  res.redirect("/");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const isValid = await bcrypt.compare(password, user.password);
  if (isValid) {
    res.send("Welcome");
  } else {
    res.send("Invalid username or password");
  }
});

app.get("/secret", (req, res) => {
  res.send("This is a secret page, you can only see this if you are logged in");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
