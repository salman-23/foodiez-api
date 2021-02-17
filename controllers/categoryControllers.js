const { Category } = require("../db/models");

// fetch is not a controller just a function
exports.fetchCategory = async (categoryId, next) => {
  try {
    const foundCategory = await Category.findByPk(categoryId);
    return foundCategory;
  } catch (error) {
    next(error);
  }
};

//Category Update
exports.categoryUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.category.update(req.body);
    // res(204).end();
    res.json(req.category);
    //send back the updated category
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
      // include: {
      //   // model: Shop,
      //   as: "shops",
      //   attributes: ["id"],
      // },
    });
    res.json(_categories);
  } catch (error) {
    next(error);
  }
};

exports.categoryCreate = async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
    //   attributes: {
    //     exclude: ["createdAt", "updatedAt"],
    //   },

    // });
  } catch (error) {
    next(error);
  }
};
