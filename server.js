const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
