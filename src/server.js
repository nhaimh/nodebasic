import express from "express";
// import connection from "./configs/connectDB";
import configViewEngine from "./configs/viewEngine";
import intitApiRoute from "./route/api";
import intitWebRoute from "./route/web";
require("dotenv").config();
var morgan = require("morgan");

const app = express();
const port = process.env.PORT || 8000;

app.use((req, res, next) => {
  console.log(">> run into my middleware");
  console.log(req.method);
  next();
});

app.use(morgan("combined"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setup  view engine
configViewEngine(app);

//init web routes
intitWebRoute(app);

//init APi route
intitApiRoute(app);

//handle 404 not found
app.use((req, res) => {
  return res.render("404.ejs");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
