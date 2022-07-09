function searchConditions(condition) {
  let conditions = {
    include: [
      {association: 'categories', attributes:['name'], through:{attributes:[]}},
      {association: 'manufacturers', attributes:["name", "image"], through:{attributes:[]}},
      {association: 'comments', through:{attributes:[]}},
      {association: 'favorites', through:{attributes:[]}},
      {association: 'reviews', through:{attributes:[]}}
    ],
  };
  if (condition === "whitComments&Reviews") {
    conditions.include[2] = {association: 'comments', through:{attributes:[]}};
    conditions.include[3] = {association: 'reviews', attributes: ["comment", "score"], through:{attributes:[]}}
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
