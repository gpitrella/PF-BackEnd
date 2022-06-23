const { Product, Categories, Manufacturer, Review } = require("../db");
const { Op } = require("sequelize");

async function filterCategories(page, size, name, category, manufacturer, min, max, order) {
  const searchConditions = {
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

  let condiciones = searchConditions;
  condiciones.limit = size
  condiciones.offset = page * size
  console.log(page+1, size, name, category, manufacturer, min, max, order)
  if(min) min = Number.parseInt(min)
  if(max) max = Number.parseInt(max)
  if(min && max && name) {console.log("entre!"),condiciones.where = {[Op.and]: [{name: {[Op.like]: `%${name}%`,},},{price: {[Op.between]: [min, max]}}]}}
  else if(max && name) {condiciones.where = {[Op.and]: [{name: {[Op.like]: `%${name}%`,},},{price: {[Op.lte]: max}}]}}
  else if(min && name) {condiciones.where = {[Op.and]: [{name: {[Op.like]: `%${name}%`,},},{price: {[Op.gte]: min}}]}}
  else if(name) {console.log("entre!"),condiciones.where = {name: {[Op.like]: `%${name}%`}}}
  else if(min && max ) {condiciones.where = {price: {[Op.between]: [min, max]}}} 
  else if(max ) {condiciones.where = {price: {[Op.lte]: max}}}
  else if(min ) {console.log("entre!"),condiciones.where = {price: {[Op.gte]: min}}}
  
  if (order) {
    order = order.split(",");
    condiciones.order = [[order[0], order[1]]];
  }
    if(category) condiciones.include[0] = {
      ...condiciones.include[0],
      where : {name: category}
    }
    if(manufacturer) condiciones.include[1] = {
      ...condiciones.include[1],
      where : {name: manufacturer}
    }

  let products = await Product.findAndCountAll(condiciones);
  products.rows = products.rows.map((product) => {
    return {
      ...product.dataValues,
      categories: product.categories?.map((product) => product.name),
      manufacturers: product.manufacturers?.map((product) => product.name),
    };
  });
  return {
    content: products.rows,
    totalPages: Math.ceil(products.count / Number.parseInt(size)),
    results: products.count
  }
}
module.exports = {
  filterCategories,
};
