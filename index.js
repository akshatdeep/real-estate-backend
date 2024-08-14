const express = require("express");
require("dotenv").config();
require("./models/connect");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const errorHandler = require("./utils/errrorHandler");
const { generatedError } = require("./middlewares/error");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const userRouter = require("./routes/user")

const app = express();

// logger

app.use(logger("tiny"));

// Bodyparser middleware

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());

// Routes middleware

// Use CORS middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.options('*', cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));


app.use("/", indexRouter);
app.use("/", userRouter );

// Session and Cookie middleware

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Error handling middleware

app.all("*", (req, res, next) => {
  next(new errorHandler(`Requested Url Not Found: ${req.url}`, 404));
});

app.use(generatedError);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
