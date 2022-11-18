import multer from "multer";
import pool from "../configs/connectDB";

let getHomePage = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM `users`");

  return res.render("index.ejs", { dataUser: rows, test: "abc string test" });
};

let getDetailPage = async (req, res) => {
  let userId = req.params.id;
  let [user] = await pool.execute(`SELECT * FROM users where id = ?`, [userId]);
  console.log("check req params :", user);
  return res.send(JSON.stringify(user));
};

let createNewUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;
  await pool.execute(
    "insert into users(firstName,lastName,email,address) values(?,?,?,?) ",
    [firstName, lastName, email, address]
  );
  return res.redirect("/");
};
let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute("DELETE FROM users WHERE id = ?", [userId]);
  return res.redirect("/");
};

let getEditPage = async (req, res) => {
  let id = req.params.id;
  let [user] = await pool.execute(`SELECT * FROM users where id = ?`, [id]);
  console.log("check req params :", user);
  return res.render("upload.ejs", { dataUser: user[0] }); // x <- y
};

let postUpdateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  await pool.execute(
    `UPDATE users SET firstName= ?, lastName= ?, email= ?, address= ? WHERE id= ? ;`,
    [firstName, lastName, email, address, id]
  );
  return res.send("update user ");
};

let getUploadPage = async (req, res) => {
  return res.render("uploadFile.ejs");
};

const upload = multer().single("profile_pic");

let handleUploadFile = async (req, res) => {
  // 'profile_pic' is the name of our file input field in the HTML form
  console.log(req.file);
  upload(req, res, function (err) {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    }

    // Display uploaded image for user validation
    res.send(
      `You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`
    );
  });
};

module.exports = {
  getHomePage,
  getDetailPage,
  createNewUser,
  deleteUser,
  getEditPage,
  postUpdateUser,
  getUploadPage,
  handleUploadFile,
};
