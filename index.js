import mysql from "mysql";
import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import expressRouter from "./routes/routes.js";
import { routeOutBound } from "./controllers/controllers.js";

//middleware section
const app = express();
app.use(express.json());
app.use(cookieParser());
config();

//Our Database Config
const PORT = process.env.PORT;
const DB_HOST = process.env.DB_HOST;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

//Connect to MySQL database
const db = mysql.createConnection({
  user: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_HOST,
  database: DB_DATABASE,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Database connected !");
});

//all routes here;
//TODO:add signup route to save users data

app.use("/api/v1/employees", expressRouter);
app.all("*", routeOutBound);

app.listen(PORT, () => {
  console.log(`Application running on port:${PORT}`);
});

export default db;
