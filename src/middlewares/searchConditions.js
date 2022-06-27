const { Categories, Manufacturer, Comments } = require("../db");

function searchConditions() {
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
        attributes: ["name","image"],
        through: {
          attributes: [],
        },
      },
      {
        model: Comments,
        attributes: ["comment"],
        through: {
          attributes: [],
        },
      },
    ],
  }
  return conditions;
}

function finishProducts(product){
  product = product.map((m) => {
    return {
      ...m.dataValues,
      categories: m.categories?.map((m) => m.name),
      //manufacturers: m.manufacturers?.map((m) => m.name),
    }
  })
  return product

}
module.exports = { searchConditions, finishProducts };
