const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");

const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const userRoute = require("./routes/user");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const MongoDBStore = require("connect-mongodb-session")(session);

mongoose.set("strictQuery", true);
const app = express();
const store = new MongoDBStore({
  uri: "mongodb+srv://tamtd:123abc@cluster0.gasa6a7.mongodb.net/asm3",
  collection: "sessions",
});
const port = process.env.PORT || 5000;
app.use(express.json());
dotenv.config();
app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "http://localhost:3001",
//       "http://localhost:3002",
//       "http://localhost:3003",
//       "http://localhost:3004",
//       "http://localhost:3005",
//     ],
//     methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
//     credentials: true,
//   })
  cors()
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
    store: store,
  })
);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});
mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!");
});
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/user", userRoute);
app.listen(port, () => {
  connect();
  console.log(`Connected to port ${port}`);
});
