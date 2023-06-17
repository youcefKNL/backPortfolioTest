const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const port = serverController.normalizePort(process.env.PORT || "4000");

// connexion à la DB
connectDB();

const app = express();
const corsOptions = {
  origin: process.env.CLIENT_URL,
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
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
