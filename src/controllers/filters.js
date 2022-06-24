const { Product } = require("../db");
const { Op } = require("sequelize");
const {searchConditions} = require("../middlewares/searchConditions")
const { Sequelize } = require("sequelize");

async function filterProducts(page, size, name, category, manufacturer, min, max, order, discount) {
  var condiciones = searchConditions()
  condiciones.limit= size,
  condiciones.offset= page * size

  if( min && max && discount && name ) {condiciones.where = {[Op.and]: [{discount: {[Op.gte]: discount}},{name: {[Op.like]: `%${name}%`}},{price: {[Op.between]: [min, max]}}]}}
  else if( discount && max && name ) {condiciones.where = {[Op.and]: [{discount: {[Op.gte]: discount}},{name: {[Op.like]: `%${name}%`}},{price: {[Op.lte]: max}}]}}
  else if( min && discount && name ) {condiciones.where = {[Op.and]: [{discount: {[Op.gte]: discount}},{name: {[Op.like]: `%${name}%`}},{price: {[Op.gte]: min}}]}}
  else if( min && max && discount ) {condiciones.where = {[Op.and]: [{discount: {[Op.gte]: discount}},{price: {[Op.between]: [min, max]}}]}}
  else if( min && max && name ) {condiciones.where = {[Op.and]: [{name: {[Op.like]: `%${name}%`}},{price: {[Op.between]: [min, max]}}]}}
  else if( name && discount ) {condiciones.where = {[Op.and]: [{name: {[Op.like]: `%${name}%`}},{discount: {[Op.gte]: discount}}]}}
  else if( max && discount ) {condiciones.where = {[Op.and]: [{discount: {[Op.gte]: discount}},{price: {[Op.lte]: max}}]}}
  else if( min && discount ) {condiciones.where = {[Op.and]: [{discount: {[Op.gte]: discount}},{price: {[Op.gte]: min}}]}}
  else if( max && name ) {condiciones.where = {[Op.and]: [{name: {[Op.like]: `%${name}%`}},{price: {[Op.lte]: max}}]}}
  else if( min && name ) {condiciones.where = {[Op.and]: [{name: {[Op.like]: `%${name}%`}},{price: {[Op.gte]: min}}]}}
  else if( min && max ) {condiciones.where = {price: {[Op.between]: [min, max]}}}
  else if( discount ) {condiciones.where = {discount: {[Op.gte]: discount}}}
  else if( name ) {condiciones.where = {name: {[Op.like]: `%${name}%`}}}
  else if( max ) {condiciones.where = {price: {[Op.lte]: max}}}
  else if( min ) {condiciones.where = {price: {[Op.gte]: min}}}


  if ( order === "random") {condiciones.order = Sequelize.literal('random()')}
  else if( order ) {order = order.split(","); condiciones.order = [[order[0], order[1]]];}

  if( category ) condiciones.include[0].where = {name: category}  
  if( manufacturer ) condiciones.include[1].where = {name: manufacturer}

  let products = await Product.findAndCountAll(condiciones);

  products.rows = products.rows.map((product) => {
    return {
      ...product.dataValues,
      categories: product.categories?.map((product) => product.name),
      // manufacturers: product.manufacturers?.map((product) => product.name),
    };
  });

  return {
    content: products.rows,
    totalPages: Math.ceil(products.count / Number.parseInt(size)),
    results: products.count
  }
}
module.exports = {
  filterProducts,
};
