require("dotenv").config();
const connectToMongo = require('./db')
connectToMongo();

const express = require('express')
const app = express()
const port = 3001

const cors = require('cors')
const router = require('./Routes/router')
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && origin !== "http://localhost:3000") {
    return res.status(403).json({ message: "Blocked by CORS policy" });
  }

  next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' },
});
app.use(limiter);
app.use(express.json());
app.use(router);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging
  res.status(500).json({ message: 'Something went wrong' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


