const { Product, Categories, Manufacturer, Review } = require("../db");
const {searchConditions, finishProducts} = require("../middlewares/searchConditions")
const {filterCategories} = require ("./filters.js")

async function getAllProduct() {
  let products = await Product.findAll(searchConditions())

  return finishProducts(products)
}

async function createProduct({ name, price, discount, stock, description, category, manufacturer, image }) {
  if (!name) throw new Error("you must enter a name")

  let findInDb = await Product.findOne({where: { name: name }})
  if (findInDb.length) throw new Error("the product already exists")

  let newProduct = await Product.create({ name: name.toUpperCase(), price, image,discount, stock, description})

  let categoryDb = await Categories.findAll({ where: { name: category }})
  await newProduct.addCategories(categoryDb)

  let manufacturerDb = await Manufacturer.findAll({where: { name: manufacturer }})
  await newProduct.addManufacturer(manufacturerDb)

  return newProduct;
}

async function getByName(name) {
  if (!name) throw new Error("you must provide a product name")

  let productInDb = await Product.findOne(searchConditions())

  if (!productInDb) throw new Error("the product does not exist")

  return finishProducts([productInDb])
}

async function getById(id) {
  if (!id) throw new Error("you must provide a product id")

  let productInDb = await Product.findByPk(id, searchConditions())

  if(!productInDb) throw new Error ("the id does not correspond to an existing product")

  return finishProducts([productInDb])
}

async function deleteProduct(id) {
  await getById(id);
  await Product.destroy({where: { id }})
  return "the product was removed"
}

async function changeProduct(id, { name, price, discount, stock, description, image }) {
  await getById(id)
  await Product.update({ name, price, discount, stock, description, image }, {where: { id }})
  return "the product was changed"
}

async function getAllPaginatedProduct(pageAsNumber, sizeAsNumber, name, category, manufacturer, min, max, order){

  let page = (!Number.isNaN(pageAsNumber) && pageAsNumber > 0)  ?  pageAsNumber -1 : 0
  
  let size = (!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 10) && !(sizeAsNumber < 1)) ?  sizeAsNumber : 10
  
  if(min) min = Number.parseInt(min)
  if(max) max = Number.parseInt(max)
  if(name) name = name.toUpperCase()
  
  let productos = await filterCategories(page, size, name, category, manufacturer, min, max, order)
  if(!productos.content.length) throw new Error ("there are no products whit thats filters")

  return productos
}

module.exports = {
  createProduct,
  getAllProduct,
  getByName,
  getById,
  deleteProduct,
  changeProduct,
  getAllPaginatedProduct
};
