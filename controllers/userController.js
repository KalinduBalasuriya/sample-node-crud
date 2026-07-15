let users = [
  {
    id: 1,
    name: "John",
    email: "john@test.com",
  },
];

// GET ALL USERS
exports.getUsers = (req, res) => {
  res.json(users);
};

// CREATE USER
exports.createUser = (req, res) => {
  const { name, email } = req.body;

  const missingFields = [];

  if (!name) missingFields.push("name");
  if (!email) missingFields.push("email");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: "Please enter following requied data",
      Missing_Fields: missingFields,
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);

  res.status(201).json(newUser);
};

// UPDATE USER
exports.updateUser = (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found here!!",
    });
  }

  user.name = req.body.name;
  user.email = req.body.email;

  res.json(user);
};

// DELETE USER
exports.deleteUser = (req, res) => {
  const id = Number(req.params.id);

  users = users.filter((user) => user.id !== id);

  res.json({
    message: "User deleted",
  });
};
