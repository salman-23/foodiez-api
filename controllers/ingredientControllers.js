const { Ingredient, Recipe, IngredientRecipe } = require("../db/models");

// fetch is not a controller just a function
exports.fetchIngredient = async (ingredientId, next) => {
  try {
    const foundIngredient = await Ingredient.findByPk(ingredientId, {
      include: {
        model: Recipe,
        as: "recipes",
        attributes: ["id"],
        through: {
          attributes: ["recipeId", "ingredientId"],
        },
      },
    });

    return foundIngredient;
  } catch (error) {
    next(error);
  }
};

//Ingredient List

exports.ingredientList = async (req, res, next) => {
  try {
    const _ingredients = await Ingredient.findAll({
      include: {
        model: Recipe,
        as: "recipes",
        attributes: ["id"],
        through: {
          attributes: ["recipeId", "ingredientId"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.json(_ingredients);
  } catch (error) {
    next(error);
  }
};
