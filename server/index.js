const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const app = express();

require("dotenv").config();
const { MONGODB_URL } = process.env;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello From backend</h1>");
});
app.use("/api/auth", userRoutes);

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(err.message);
  });
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
