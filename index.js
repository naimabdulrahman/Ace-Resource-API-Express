const express = require("express");
const app = express();
const pool = require("./server/config/dbconfig");

const authRoute = require("./server/routes/Auth");
const userRoute = require("./server/routes/User");
const hobbyRoute = require("./server/routes/Hobby");

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/hobby", hobbyRoute);

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
