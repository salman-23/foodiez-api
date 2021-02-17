const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
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
  });

  SequelizeSlugify.slugifyModel(Category, {
    source: ["name"],
  });

  return Category;
};
