const express = require("express");
const {
  ingredientUpdate,
  ingredientList,
  ingredientDelete,
  fetchIngredient,
  ingredientCreate,
} = require("../controllers/ingredientControllers");

const router = express.Router();
const upload = require("../middleware/multer");

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

//Ingredient Update Route
// router.put("/:ingredientId", upload.single("image"), ingredientUpdate);

//Ingredient List Route
router.get("/", ingredientList);
router.post(
  "/:categoryId/ingredients",
  upload.single("image"),
  ingredientCreate
);

//Ingredient Delete Route
// router.delete("/:ingredientId", ingredientDelete);

module.exports = router;
