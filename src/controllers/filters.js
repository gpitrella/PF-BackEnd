const { Product, Categories, Manufacturer, Review } = require("../db");
const { Op } = require("sequelize");
const {searchConditions} = require("../middlewares/searchConditions")
async function filterCategories(page, size, name, category, manufacturer, min, max, order) {
  var condiciones = searchConditions()
  condiciones.limit= size,
  condiciones.offset= page * size

  if( min && max && name ) {condiciones.where = {[Op.and]: [{name: {[Op.like]: `%${name}%`,},},{price: {[Op.between]: [min, max]}}]}}
  else if( max && name ) {condiciones.where = {[Op.and]: [{name: {[Op.like]: `%${name}%`,},},{price: {[Op.lte]: max}}]}}
  else if( min && name ) {condiciones.where = {[Op.and]: [{name: {[Op.like]: `%${name}%`,},},{price: {[Op.gte]: min}}]}}
  else if( min && max ) {condiciones.where = {price: {[Op.between]: [min, max]}}}
  else if( name ) {condiciones.where = {name: {[Op.like]: `%${name}%`}}}
  else if( max ) {condiciones.where = {price: {[Op.lte]: max}}}
  else if( min ) {condiciones.where = {price: {[Op.gte]: min}}}
  
  if( order ) {order = order.split(","); condiciones.order = [[order[0], order[1]]];}
  if( category ) condiciones.include[0].where = {name: category}  
  if( manufacturer ) condiciones.include[1].where = {name: manufacturer}

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
