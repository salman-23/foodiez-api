const { Ingredient, Category } = require("../db/models");

// fetch is not a controller just a function
exports.fetchIngredient = async (ingredientId, next) => {
  try {
    const foundIngredient = await Ingredient.findByPk(ingredientId);
    return foundIngredient;
  } catch (error) {
    next(error);
  }
};

//Ingredient Update
exports.ingredientUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.ingredient.update(req.body);
    // res(204).end();
    res.json(req.ingredient);
    //send back the updated ingredient
  } catch (error) {
    next(error);
  }
};

//Ingredient List

exports.ingredientList = async (req, res, next) => {
  try {
    const _ingredients = await Ingredient.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Category,
        as: "categories",
        attributes: ["id"],
      },
    });
    res.json(_ingredients);
  } catch (error) {
    next(error);
  }
};

exports.ingredientCreate = async (req, res, next) => {
  try {
    const newIngredient = await Ingredient.create(req.body);
    res.status(201).json(newIngredient);
    // attributes: {
    //   exclude: ["createdAt", "updatedAt"],
    // },

    // });
  } catch (error) {
    next(error);
  }
};
