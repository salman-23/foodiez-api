const { Recipe, Ingredient, IngredientRecipe } = require("../db/models");

// fetch is not a controller just a function
exports.fetchRecipe = async (recipeId, next) => {
  try {
    const foundRecipe = await Recipe.findByPk(recipeId, {
      include: {
        model: Ingredient,
        as: "ingredients",
        attributes: ["id"],
        through: {
          attributes: ["recipeId", "ingredientId"],
        },
      },
    });
    return foundRecipe;
  } catch (error) {
    next(error);
  }
};

//Recipe List

exports.recipeList = async (req, res, next) => {
  try {
    const _recipes = await Recipe.findAll({
      include: {
        model: Ingredient,
        as: "ingredients",
        attributes: ["id"],
        through: {
          attributes: ["recipeId", "ingredientId"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.json(_recipes);
  } catch (error) {
    next(error);
  }
};

exports.recipeCreate = async (req, res, next) => {
  try {
    // req.body.recipeId = req.recipe.id;

    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newRecipe = await Recipe.create(req.body);
    newRecipe.addIngredients(req.body.ingredients);
    // newRecipe.addIngredients(req.body.ingredients);
    res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};
