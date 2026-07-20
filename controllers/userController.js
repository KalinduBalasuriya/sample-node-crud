const { getPool, sql } = require("../config/db");

// GET ALL USERS
exports.getUsers = async (req, res) => {
  try {
    const pool = getPool();
    const result = await pool.request().query("SELECT * FROM users");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching users",
      error: err.message,
    });
  }
};

// CREATE USER
exports.createUser = async (req, res) => {
  const { name, email } = req.body;

  const missingFields = [];
  if (!name) missingFields.push("name");
  if (!email) missingFields.push("email");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: "Please enter following required data",
      Missing_Fields: missingFields,
    });
  }

  try {
    const pool = getPool();
    const result = await pool
      .request()
      .input("name", sql.NVarChar, name)
      .input("email", sql.NVarChar, email).query(`
                INSERT INTO users (name, email)
                OUTPUT INSERTED.*
                VALUES (@name, @email)
            `);
    res.status(201).json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({
      message: "Error creating user",
      error: err.message,
    });
  }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  const id = Number(req.params.id);
  const { name, email } = req.body;

  try {
    const pool = getPool();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("name", sql.NVarChar, name)
      .input("email", sql.NVarChar, email).query(`
                UPDATE users
                SET name = @name, email = @email
                OUTPUT INSERTED.*
                WHERE id = @id
            `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({
      message: "Error updating user!",
      error: err.message,
    });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const pool = getPool();
    const result = await pool.request().input("id", sql.Int, id).query(`
                DELETE FROM users
                OUTPUT DELETED.*
                WHERE id = @id
            `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting user",
      error: err.message,
    });
  }
};
