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

module.exports = {
  getHomePage,
  getDetailPage,
  createNewUser,
};
