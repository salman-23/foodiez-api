const { Category, Ingredient } = require("../db/models");

// fetch is not a controller just a function
exports.fetchCategory = async (categoryId, next) => {
  try {
    const foundCategory = await Category.findByPk(categoryId);
    return foundCategory;
  } catch (error) {
    next(error);
  }
};

//Category List

exports.categoryList = async (req, res, next) => {
  try {
    const _categories = await Category.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Ingredient,
        as: "ingredients",
        attributes: ["id"],
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.json(_categories);
  } catch (error) {
    next(error);
  }
};

exports.categoryCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

exports.ingredientCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.categoryId = req.category.id;
    const newIngredient = await Ingredient.create(req.body);
    res.status(201).json(newIngredient);
  } catch (error) {
    next(error);
  }
};
