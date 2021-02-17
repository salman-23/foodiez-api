const express = require("express");
const {
  categoryUpdate,
  categoryList,
  categoryDelete,
  fetchCategory,
  categoryCreate,
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

//Category Update Route
// router.put("/:categoryId", upload.single("image"), categoryUpdate);

//Category List Route
router.get("/", categoryList);
router.post("/", categoryCreate);

//Category Delete Route
// router.delete("/:categoryId", categoryDelete);

module.exports = router;
