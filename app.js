const express = require("express");
const cors = require("cors");
const categoryRoutes = require("./routes/category");
const ingredientRoutes = require("./routes/ingredient");
const recipeRoutes = require("./routes/recipe");

const app = express();
const db = require("./db/models");
const path = require("path");

app.use(express.json());
app.use(cors());
app.use("/categories", categoryRoutes);
app.use("/ingredients", ingredientRoutes);
app.use("/recipes", recipeRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

//Not Found Middleware
app.use((req, res, next) => {
  next({ status: 404, message: "Path Not Found" });
});

// Eror Handeling Middleware
app.use((err, req, res, next) => {
  res
    .status(err.status ? err.status : 500)
    .json({ message: err.message ? err.message : "Internal Server Error" });
});

// db.sequelize.sync();
db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });

const PORT = 8001;
app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
