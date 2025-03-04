require('dotenv').config()

const express = require("express");
const mongoose = require("mongoose");
const Documents = require("./routes/api/documents");
const Users = require("./routes/api/users");
const Auth = require("./routes/api/auth");
const path = require("path");
const cors = require('cors');
const pino = require('pino');
const pinoHttp = require('pino-http');

const port = 5001;
const app = express();

const MONGO_URI = 'mongodb://root:rootpassword@localhost:27000/default?authSource=admin';

// Setup the logger
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  redact: ['req.headers.authorization', 'req.headers.cookie', 'req.body.password'],
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
});

// Request logging middleware with pino-http
const pinoMiddleware = pinoHttp({
  logger
});

app.use(express.json());
app.use(cors());
app.use(pinoMiddleware);

// Routes:
app.use("/api/documents", Documents);
app.use("/api/users", Users);
app.use("/api/auth", Auth);

// Serve Static Assets(build folder) if in production:
if(process && process.env.NODE_ENV == "production") {
    // Set Static Folder:
    app.use(express.static("client/build"));
    // Get anything "*"
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

// // Connect to Mongo:
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useCreateIndex: true})
    .then(() => logger.info("Mongo DB Connected..."))
    .catch(err => logger.error(err, "MongoDB connection error"));

app.listen(port, () => logger.info(`Server Running On Port: ${port}`));
