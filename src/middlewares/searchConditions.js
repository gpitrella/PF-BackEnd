const { Product, Categories, Manufacturer, Review } = require("../db");

function searchConditions() {
  return {
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
  };
}

function finishProducts(product){
  product = product.map((m) => {
    return {
      ...m.dataValues,
      categories: m.categories?.map((m) => m.name),
      manufacturers: m.manufacturers?.map((m) => m.name),
    }
  })
  return product
}
module.exports = { searchConditions, finishProducts };
