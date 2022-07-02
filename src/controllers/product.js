const { Product, Categories, Manufacturer } = require("../db");
const {searchConditions, finishProducts} = require("../middlewares/searchConditions")
const {filterProducts} = require ("./filters.js")

function verifyProductData(data) {
  let { name, price, discount, stock, isVisible } = data
  if(isVisible && !(['true','false'].includes(isVisible))) throw new Error("isVisible must be a boolean")
  if(discount && !/^[0-9]*$/.test(discount)) throw new Error("the discount must be a number");
  if(stock && !/^[0-9]*$/.test(stock)) throw new Error("the stock must be a number");
  if(price && !/^[0-9]*$/.test(price)) throw new Error("the price must be a number");
  if(name) data.name.toUpperCase()
  return data
}

function verifyProductName(name) {
  if (!name) throw new Error("a name is required for the product"); 
  return name.toUpperCase()
}

async function verifyDuplicateProduct(name) {
  let findInDb = await Product.findOne({ where: { name } });
  if (findInDb) throw new Error(`the product ${findInDb.name}  already exists`);
}

async function verifyProductId(id) {
  if (!id) throw new Error("you must provide a product id");
  if(!/^[0-9]*$/.test(id)) throw new Error("the id must be a number");

  let productInDb = await Product.findByPk(id, searchConditions("whitComments&Reviews"));

  if (!productInDb) throw new Error("the id does not correspond to an existing product");

  return finishProducts([productInDb]);
}

async function verifyManufacturerAndCategory(newProduct, category, manufacturer){
  if (category) {category = category.toUpperCase();
  let categoryDb = await Categories.findAll({ where: { name: category } });
  await newProduct.addCategories(categoryDb);}
    
  if (manufacturer) {manufacturer = manufacturer.toUpperCase();
  let manufacturerDb = await Manufacturer.findAll({where: { name: manufacturer },});
  await newProduct.addManufacturer(manufacturerDb);}
}

async function getAllProduct() {
  let products = await Product.findAll(searchConditions());
  return finishProducts(products);
}

async function createProduct(data) {
  let {name, price, discount, stock, description, category, manufacturer, image, isVisible} = await verifyProductData(data)
  if (!name) throw new Error("a name is required for the product"); 
  if (!price) throw new Error("a price is required for the product"); 
  await verifyDuplicateProduct(name)
  let newProduct = await Product.create({
    name,
    price,
    image,
    discount,
    stock,
    description,
    isVisible,
  });


  await verifyManufacturerAndCategory(newProduct, category, manufacturer)

  return newProduct;
}

async function getByName(name) {
  name = verifyProductName(name)

  let searchConditionsWhereName = searchConditions()
  searchConditionsWhereName.where = { name }

  let productInDb = await Product.findOne(searchConditionsWhereName);
  if (!productInDb) throw new Error("the product does not exist");

  return finishProducts([productInDb]);
}

async function getById(id) {
  let productInDb = await verifyProductId(id);
  return productInDb
}

async function deleteProduct(id) {
  await verifyProductId(id);
  await Product.destroy({ where: { id } });
  return "the product was removed";
}

async function updateProduct( id, data ) {
  await verifyProductId(id);
  let { name, price, discount, stock, description, image, isVisible } = await verifyProductData(data)
  await Product.update(
    { name, price, discount, stock, description, image, isVisible },
    { where: { id } }
  );
  return "the product was changed";
}

async function getAllPaginatedProduct(
  pageAsNumber,
  sizeAsNumber,
  name,
  category,
  manufacturer,
  min,
  max,
  order,
  discount,
  isVisible
) {
  let page =
    !Number.isNaN(pageAsNumber) && pageAsNumber > 0 ? pageAsNumber - 1 : 0;

  let size =
    !Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 10) && !(sizeAsNumber < 1)
      ? sizeAsNumber
      : 10;

  if (min) min = Number.parseInt(min);
  if (max) max = Number.parseInt(max);
  if (discount) discount = Number.parseInt(discount);
  if (name) name = name.toUpperCase();
  if (manufacturer) manufacturer = manufacturer.toUpperCase()
  if (category) category = category.toUpperCase()
  if(!isVisible || isVisible != "false") isVisible = true

  let products = await filterProducts(
    page,
    size,
    name,
    category,
    manufacturer,
    min,
    max,
    order,
    discount,
    isVisible
  );

  return products;
}

module.exports = {
  verifyProductId,
  createProduct,
  getAllProduct,
  getByName,
  getById,
  deleteProduct,
  updateProduct,
  getAllPaginatedProduct,
};
