const { Product, Categories, Manufacturer, Review } = require("../db");

async function getAllProduct() {
  let product = await Product.findAll({
    include: [
      {
        model: Categories,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      {
        model: Manufacturer,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  product = product.map((m) => {
    return {
      ...m.dataValues,
      categories: m.categories?.map((m) => m.name),
      manufacturers: m.manufacturers?.map((m) => m.name),
    };
  });
  return product;
}

async function createProduct( name, price, discount, stock, description, category, manufacturer, image ) {
  if (name) {
    let findInDb = await Product.findOne({
      where: { name: name },
    });
    console.log('create',findInDb)
    if (!findInDb) {
      let newProduct = await Product.create({ name, price, image,discount, stock, description});
      let categoryDb = await Categories.findAll({
        where: { name: category },
      });
      await newProduct.addCategories(categoryDb);
      let manufacturerDb = await Manufacturer.findAll({
        where: { name: manufacturer },
      });
      await newProduct.addManufacturer(manufacturerDb);
      return newProduct;
    } else {
      throw new Error("the product already exists");
    }
  }
  throw new Error("you must enter a name");
}

async function getByName(name) {
  if (name) {
    let productInDb = await Product.findOne({
      where: { name: name },
      include: [
        {
          model: Categories,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Manufacturer,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    // aca no hace falta hacer un product
    let product = [];
    product.push(productInDb);
    if (!productInDb) throw new Error("the product does not exist");
    product = product.map((m) => {
      return {
        ...m.dataValues,
        categories: m.categories?.map((m) => m.name),
        manufacturers: m.manufacturers?.map((m) => m.name),
      };
    });
    return product;
  } else {
    throw new Error("you must provide a product name");
  }
}

async function getById(id) {
  if (id) {
    let productInDb = await Product.findByPk(id, {
      include: [
        {
          model: Categories,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Manufacturer,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    // aca no hace falta hacer un product
    let product = [];
   if(!productInDb) throw new Error ("the id does not correspond to an existing product")
    product.push(productInDb);
    product = product.map((m) => {
      return {
        ...m.dataValues,
        categories: m.categories?.map((m) => m.name),
        manufacturers: m.manufacturers?.map((m) => m.name),
      };
    });

    return product;
  } else {
    throw new Error("you must provide a product id");
  }
}

async function deleteProduct(id) {
  if (!id) throw new Error("you must provide a product id");
  await Product.destroy({
    where: { id },
  });
  return "the product was removed";
}

async function changeProduct(id, { name, price, discount, stock, description, image }) {
  await getById(id)
  await Product.update(
    { name, price, discount, stock, description, image },
    {
      where: { id },
    }
  );
  return "the name was changed";
}

module.exports = {
  createProduct,
  getAllProduct,
  getByName,
  getById,
  deleteProduct,
  changeProduct
};
