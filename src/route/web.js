import express from "express";
import multer from "multer";
import homeController from "../controller/homeController";
import path from "path";

var appRoot = require("app-root-path");
let router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/image/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });
let upload1 = multer({ storage: storage, fileFilter: imageFilter }).array(
  "multiple_images"
);

const intitWebRoute = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/detail/user/:id", homeController.getDetailPage);
  router.post("/create-new-user", homeController.createNewUser);

  router.post("/delete-user", homeController.deleteUser);
  router.get("/edit-user/:id", homeController.getEditPage);
  router.post("/update-user", homeController.postUpdateUser);

  router.get("/upload", homeController.getUploadPage);
  router.post(
    "/upload-profile-pic",
    upload.single("profile_pic"),
    homeController.handleUploadFile
  );
  router.get("/about", (req, res) => {
    res.send("dmm");
  });
  router.post(
    "/upload-multiple-images",
    (req, res, next) => {
      upload1(req, res, (err) => {
        if (err instanceof multer.MulterError && err.code === "up it thoi") {
          res.send("up it thoi");
        } else if (err) {
          res.send(err);
        } else {
          next();
        }
      });
    },
    homeController.handleUploadMultipleFiles
    // "/upload-multiple-images",
    // upload.array("multiple_images", 3),
    // homeController.handleUploadMultipleFiles
  );

  return app.use("/", router);
};

export default intitWebRoute;
