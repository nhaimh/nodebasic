import pool from "../configs/connectDB";
let getAllUsers = async (req, res) => {
  //http
  // 404 501
  // json/xml => object
  const [rows, fields] = await pool.execute("SELECT * FROM users ");
  return res.status(200).json({
    message: "oke ngu",
    data: rows,
  });
};
let createNewUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;
  if (!firstName || !lastName || !email || !address) {
    return res.status(200).json({
      message: " missing required params",
    });
  }
  await pool.execute(
    "insert into users(firstName,lastName,email,address) values(?,?,?,?) ",
    [firstName, lastName, email, address]
  );
  return res.status(200).json({
    message: " oke",
  });
};

let updateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  if (!firstName || !lastName || !email || !address || !id) {
    return res.status(200).json({
      message: " missing required params",
    });
  }
  await pool.execute(
    `UPDATE users SET firstName= ?, lastName= ?, email= ?, address= ? WHERE id= ? ;`,
    [firstName, lastName, email, address, id]
  );
  return res.status(200).json({
    message: "oke ngu",
  });
};
let deleteUser = async (req, res) => {
  let userId = req.params.id;
  if (!userId) {
    return res.status(200).json({
      message: " missing required params",
    });
  }
  await pool.execute("DELETE FROM users WHERE id = ?", [userId]);
  return res.status(200).json({
    message: "oke ngu",
  });
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
