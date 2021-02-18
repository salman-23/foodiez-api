const { Ingredient, Recipe } = require("../db/models");

// fetch is not a controller just a function
exports.fetchIngredient = async (ingredientId, next) => {
  try {
    const foundIngredient = await Ingredient.findByPk(ingredientId);
    return foundIngredient;
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
        model: Recipe,
        as: "recipes",
        attributes: ["id"],
      },
    });
    res.json(_ingredients);
  } catch (error) {
    next(error);
  }
};
