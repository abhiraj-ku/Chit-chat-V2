const app = express();
const cors = require("cors");
const helmet = require("helmet");
const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const userRoutes = require("./routes/userRoutes");
const messagesRoute = require("./routes/messagesRoute");
const { Strategy } = require("passport-google-oauth20");
const User = require("./model/userModel");

const socket = require("socket.io");

require("dotenv").config();
const { MONGODB_URL } = process.env;
app.use(cors());
app.use(express.json());

// google Oauth config
const googleConfig = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY: process.env.COOKIE_KEY,
};

// auth options
const AUTH_OPTIONS = {
  callbackURL: "http://localhost:3000/auth/google/callback",
  clientID: googleConfig.CLIENT_ID,
  clientSecret: googleConfig.CLIENT_SECRET,
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log("Google profile", profile);

  //error handling if profile is null
  if (!profile) {
    return done(new Error("Authentication failed"));
  }

  done(null, profile);
}

// passport serialize
passport.serializeUser((user, done) => {
  done(nulll, user.id);
});
passport.deserializeUser((user, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
  // done(nulll, user.id);
});

//
passport.use(new Strategy());
// Root route with a beautiful welcome message
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/welcome.html");
});

app.use("/api/auth", userRoutes);
app.use("/api/message", messagesRoute);

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    console.log("sendmsg", { data });
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
