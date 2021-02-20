const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define("Recipe", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
    },

    image: {
      type: DataTypes.STRING,
      isUrl: true,
    },

    // {

    //   timestamps: false,

    // }

    // in
    // ingredient: {
    //   type: DataTypes.STRING,
    //   defaultValue: ["water"],
    // },
  });

  SequelizeSlugify.slugifyModel(Recipe, {
    source: ["name"],
  });

  return Recipe;
};
