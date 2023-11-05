const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./routes/auth");
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(
  cors({
    origin: ["https://registration-three-rho.vercel.app/"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/", userRoute);
app.get("/", (req, res) => {
  res.send("home");
});

app.listen(port, () => {
  console.log("Server connected on port 3000");
});
