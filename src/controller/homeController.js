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
  console.log("check req :", req.body);
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

module.exports = {
  getHomePage,
  getDetailPage,
  createNewUser,
  deleteUser,
  getEditPage,
  postUpdateUser,
};
