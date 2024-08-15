const express = require("express");
require("dotenv").config();
require("./models/connect");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const errorHandler = require("./utils/errrorHandler"); // Fixed typo
const { generatedError } = require("./middlewares/error");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post")

const app = express();

// Logger middleware
app.use(logger("tiny"));

// Bodyparser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cookie parser middleware
app.use(cookieParser());

// Use CORS middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// Handle pre-flight requests with CORS
app.options(
  "*",
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);


// Routes middleware
app.use("/", indexRouter);
app.use("/", userRouter);
app.use("/", postRouter);

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Error handling for undefined routes
app.all("*", (req, res, next) => {
  next(new errorHandler(`Requested Url Not Found: ${req.url}`, 404));
});

// Centralized error handling
app.use(generatedError);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
