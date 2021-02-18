const express = require("express");
const {
  ingredientList,
  fetchIngredient,
  ingredientCreate,
} = require("../controllers/ingredientControllers");

const router = express.Router();

router.param("ingredientId", async (req, res, next, ingredientId) => {
  const foundIngredient = await fetchIngredient(ingredientId, next);
  if (foundIngredient) {
    req.ingredient = foundIngredient;
    next();
  } else {
    next({
      status: 404,
      message: "Ingredient Not Found",
    });
  }
});

//Ingredient List Route
router.get("/", ingredientList);

module.exports = router;
