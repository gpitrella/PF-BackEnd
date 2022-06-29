const { Categories, Manufacturer, Comments, Review } = require("../db");

function searchConditions(condition) {
  let conditions = {
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
        attributes: ["name", "image"],
        through: {
          attributes: [],
        },
      },
    ],
  };
  if (condition === "whitComments&Reviews") {
    conditions.include[2] = {
      model: Comments,
      attributes: ["comment"],
      through: {
        attributes: [],
      },
    };
    conditions.include[3] = {
      model: Review,
      attributes: ["comment", "score"],
      through: {
        attributes: [],
      },
    };
  }
  return conditions;
}

function finishProducts(product) {
  product = product.map((m) => {
    return {
      ...m.dataValues,
      categories: m.categories?.map((m) => m.name),
      //manufacturers: m.manufacturers?.map((m) => m.name),
    };
  });
  return product;
}
module.exports = { searchConditions, finishProducts };
