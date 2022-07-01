const { Product, Categories, Manufacturer } = require("../db");
const {searchConditions, finishProducts} = require("../middlewares/searchConditions")
const {filterProducts} = require ("./filters.js")

async function getAllProduct() {
  let products = await Product.findAll(searchConditions());
  return finishProducts(products);
}

async function createProduct({
  name,
  price,
  discount,
  stock,
  description,
  category,
  manufacturer,
  image,
  isVisible,
}) {
  if (!name) throw new Error("you must enter a name");
  name = name.toUpperCase();

  if(isVisible && typeof isVisible != 'boolean') throw new Error("isVisible must be a boolean")
  let findInDb = await Product.findOne({ where: { name: name } });
  if (findInDb) throw new Error(`the product ${findInDb.name}  already exists`);

  let newProduct = await Product.create({
    name,
    price,
    image,
    discount,
    stock,
    description,
    isVisible,
  });

  if (category) {category = category.toUpperCase();
  let categoryDb = await Categories.findAll({ where: { name: category } });
  await newProduct.addCategories(categoryDb);}
  
  if (manufacturer) {manufacturer = manufacturer.toUpperCase();
  let manufacturerDb = await Manufacturer.findAll({
    where: { name: manufacturer },
  });
  await newProduct.addManufacturer(manufacturerDb);}

  return newProduct;
}

async function getByName(name) {
  if (!name) throw new Error("you must provide a product name");

  let productInDb = await Product.findOne(searchConditions());

  if (!productInDb) throw new Error("the product does not exist");

  return finishProducts([productInDb]);
}

async function getById(id) {
  if (!id) throw new Error("you must provide a product id");

  let productInDb = await Product.findByPk(id, searchConditions("whitComments&Reviews"));

  if (!productInDb) throw new Error("the id does not correspond to an existing product");

  return finishProducts([productInDb]);
}

async function deleteProduct(id) {
  await getById(id);
  await Product.destroy({ where: { id } });
  return "the product was removed";
}

async function updateProduct(
  id,
  { name, price, discount, stock, description, image, isVisible }
) { //recien me doy cuenta que no tiene Niguna comprobacion de si le estamos mandando lo correcto
  await getById(id);
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
  createProduct,
  getAllProduct,
  getByName,
  getById,
  deleteProduct,
  updateProduct,
  getAllPaginatedProduct,
};
