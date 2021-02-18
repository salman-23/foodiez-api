const express = require("express");
const {
  categoryList,
  fetchCategory,
  categoryCreate,
  ingredientCreate,
} = require("../controllers/categoryControllers");

const router = express.Router();
const upload = require("../middleware/multer");

router.param("categoryId", async (req, res, next, categoryId) => {
  const foundCategory = await fetchCategory(categoryId, next);
  if (foundCategory) {
    req.category = foundCategory;
    next();
  } else {
    next({
      status: 404,
      message: "Category Not Found",
    });
  }
});

//Category List Route
router.get("/", categoryList);

//Category Post Route
router.post("/", upload.single("image"), categoryCreate);

//Ingredient Post Route
router.post(
  "/:categoryId/ingredients",
  upload.single("image"),
  ingredientCreate
);

module.exports = router;
