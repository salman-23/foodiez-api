const express = require("express");
const {
  recipeList,
  fetchRecipe,
  recipeCreate,
} = require("../controllers/recipeControllers");

const router = express.Router();
const upload = require("../middleware/multer");

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

//Recipe Post Route
router.post("/", upload.single("image"), recipeCreate);

module.exports = router;
