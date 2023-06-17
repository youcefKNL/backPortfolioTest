const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 4000;

const cors = require("cors");
// connexion à la DB
connectDB();

const app = express();
const corsOptions = {
  origin: ["http://localhost:3000", "https://youcefknl.github.io"],
  credentials: true,
  allowedHeaders:
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  exposedHeaders: ["sessionId"],
  methods: "GET,POST",
  preflightContinue: false,
};
app.use(cors(corsOptions));
// Middleware qui permet de traiter les données de la Request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/project", require("./routes/post.routes"));

// server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
