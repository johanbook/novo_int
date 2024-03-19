const express = require("express");
const mongoose = require("mongoose");
const Documents = require("./routes/api/documents");
const Users = require("./routes/api/users");
const Auth = require("./routes/api/auth");
const path = require("path");
var cors = require('cors')

const port = 5001;
const app = express();

const MONGO_URI = 'mongodb://root:rootpassword@localhost:27000/default?authSource=admin';

app.use(express.json());
app.use(cors())

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
    .then(() => console.log("Mongo DB Connected..."))
    .catch(err => console.log(err));

app.listen(port, () => console.log(`Server Running On Port: ${port}`));
