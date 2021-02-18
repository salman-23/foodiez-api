const express = require("express");
const {
  recipeList,
  fetchRecipe,
  recipeCreate,
} = require("../controllers/recipeControllers");

const router = express.Router();

router.param("recipeId", async (req, res, next, recipeId) => {
  const foundRecipe = await fetchRecipe(recipeId, next);
  if (foundRecipe) {
    req.recipe = foundRecipe;
    next();
  } else {
    next({
      status: 404,
      message: "Recipe Not Found",
    });
  }
});

//Recipe List Route
router.get("/", recipeList);
// router.post("/", recipeList);

module.exports = router;
