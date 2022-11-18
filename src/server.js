import express from "express";
// import connection from "./configs/connectDB";
import configViewEngine from "./configs/viewEngine";
import intitApiRoute from "./route/api";
import intitWebRoute from "./route/web";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setup  view engine
configViewEngine(app);

//init web routes
intitWebRoute(app);

//init APi route
intitApiRoute(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
