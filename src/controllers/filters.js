const { Product, Categories, Manufacturer, Review } = require("../db");
const { Op } = require("sequelize");

const condicionesDeBusqueda = {
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

async function filterCategories(
  {name,
  category,
  manufacturer,
  min,
  max,
  order
}) {
  var condiciones = condicionesDeBusqueda;
  if(min && max && name) {condiciones.where = {[Op.and]: [{name: {[Op.like]: `%${name}%`,},},{price: {[Op.between]: [min, max]}}]}}
  else if(max && name) {condiciones.where = {[Op.and]: [{name: {[Op.like]: `%${name}%`,},},{price: {[Op.lte]: max}}]}}
  else if(min && name) {condiciones.where = {[Op.and]: [{name: {[Op.like]: `%${name}%`,},},{price: {[Op.gte]: min}}]}}
  else if(name) {condiciones.where = {name: {[Op.like]: `%${name}%`}}}
  else if(min && max ) {condiciones.where = {price: {[Op.between]: [min, max]}}} 
  else if(max ) {condiciones.where = {price: {[Op.lte]: max}}}
  else if(min ) {condiciones.where = {price: {[Op.gte]: min}}}
  
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


  let products = await Product.findAll(condiciones);
  products = products.map((product) => {
    return {
      ...product.dataValues,
      categories: product.categories?.map((product) => product.name),
      manufacturers: product.manufacturers?.map((product) => product.name),
    };
  });
  return products;
}
module.exports = {
  filterCategories,
};
