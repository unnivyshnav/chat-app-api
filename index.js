const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./routes/user");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use("/auth", userRouter);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.listen(5000, () => console.log("Server started"));
