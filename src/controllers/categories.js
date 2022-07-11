// const { CanceledError } = require("axios");
const { Categories, Product } = require("../db");
const { Op } = require("sequelize");
const excludeTimeStamps = {attributes: {exclude: ['updatedAt','createdAt']}}

function verifyCategoryName(name){
  if (!name) throw new Error("a name is required for the category");
  return name.toUpperCase();
}

async function verifyDuplicateCategory(name) {
  let findInDb = await Categories.findOne({ where: { name } });
  if (findInDb)
    throw new Error(`the category ${findInDb.name}  already exists`);
}

async function verifyCategoryId(id) {
  if (!id) throw new Error("you must provide a category id");
  if(!/^[0-9]*$/.test(id)) throw new Error("the id must be a number");

  let categoryInDb = await Categories.findByPk(id, excludeTimeStamps);

  if (!categoryInDb) throw new Error("the id does not correspond to an existing category");

  return categoryInDb;
}

async function getAllCategories() {
  let categories = await Categories.findAll(excludeTimeStamps);
  if (!categories.length) throw new Error("there are not categories");

  return categories;
}

async function createCategory(name) {
  name = verifyCategoryName(name)

  await verifyDuplicateCategory(name)

  let newCategory = await Categories.create({ name });
  return `category ${newCategory.name} created successfully`;
}

async function getCategoryById(id) {
  let categoryInDb = await verifyCategoryId(id);
  return categoryInDb;
}

async function updateCategory(id, name) {
  await verifyCategoryId(id);
  name = verifyCategoryName(name)
  await Categories.update({ name }, { where: { id } });
  return "the category was successfully updated";
}

async function deleteCategory(id) {
  await verifyCategoryId(id);
  let productsInDb = await Product.findAll({include:[{association: 'categories', where: { id }}]});

  for(product of productsInDb){
    let quantityOfCategories = await product.countCategories()
    if(quantityOfCategories == 1) throw new Error ("there is at least one product that only has this category, so it cannot be eliminated")
  }

  await Categories.destroy({where: { id }});
  return `The category ${productsInDb[0].dataValues.categories[0].dataValues.name} was remove`;
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
