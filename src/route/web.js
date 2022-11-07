import express from "express";
import homeController from "../controller/homeController";

let router = express.Router();

const intitWebRoute = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/detail/user/:id", homeController.getDetailPage);
  router.post("/create-new-user", homeController.createNewUser);
  router.get("/about", (req, res) => {
    res.send("dmm");
  });

  return app.use("/", router);
};

export default intitWebRoute;
