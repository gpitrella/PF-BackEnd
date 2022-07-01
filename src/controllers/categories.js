const { CanceledError } = require("axios");
const { Categories, Product } = require("../db");
const { getById } = require("./product");

async function getAllCategories() {
  let categories = await Categories.findAll({ attributes: ["name"] });
  if (!categories.length) throw new Error("there are not categories");

  return categories;
}

async function createCategory(name) {
  if (!name) throw new Error("a name is required for the category");
  name = name.toUpperCase();

  let findInDb = await Categories.findOne({ where: { name: name } });
  if (findInDb)
    throw new Error(`the category ${findInDb.name}  already exists`);

  let newCategory = await Categories.create({ name: name });
  return `category ${newCategory.name} created successfully`;
}

async function getCategoryById(id) {
  if (!id) throw new Error("you must provide a product id");

  let categoryInDb = await Categories.findOne({ where: { id: id } });

  if (!categoryInDb)
    throw new Error("the id does not correspond to an existing product");

  return categoryInDb;
}

async function deleteCategory(id) {
  await getCategoryById(id);
  let productsWhitCategory = await Product.findAll({
    include: [
      {
        model: Categories,
        attributes: ["name"],
        through: {
          attributes: [],
        },
        where: { id: id },
      },
    ],
  });
  productsWhitCategory.map((product)=> {
    if(product.categories.length <= 1) throw new Error ("there is at least one product that only has this category, so it cannot be eliminated")
  })
    await Categories.destroy({ where: { id : id} });
  return "The category was remove";
}

async function updateCategory(id, name) {
  await getCategoryById(id);
  await Categories.update({ name: name }, { where: { id: id } });
  return "the category was successfully updated";
}

module.exports = {
  createCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
};
