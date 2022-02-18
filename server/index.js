const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())

const userRoutes = require("./router/user");

app.use(userRoutes);

const port = process.env.PORT || 4000;
const db_url = process.env.DATABASE
const docker_db_url = process.env.DOCKER_DATABASE

mongoose
  .connect('mongodb://127.0.0.1:27017/surge-internship')
  .then(() => {
    app.listen(4000, () => {
      console.log("server is runs on port ", 4000);
    });
  })
  .catch((err) => {
    console.log("database not connected");
  });
