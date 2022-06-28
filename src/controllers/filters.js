const { Product } = require("../db");
const { Op } = require("sequelize");
const {searchConditions, finishProducts} = require("../middlewares/searchConditions.js")
const { Sequelize } = require("sequelize");

async function filterProducts(page, size, name, category, manufacturer, min, max, order, discount) {
  var condiciones = searchConditions()
  condiciones.limit= size,
  condiciones.offset= page * size

  if((((min || max ) || discount) && name) || ((min || max ) && discount )) {condiciones.where = {[Op.and]: [filtradosDeProducts(min, max, discount, name)]}}
  else if(min || max || discount || name) {condiciones.where = filtradosDeProducts(min, max, discount, name)}

  if ( order === "random") {condiciones.order = Sequelize.literal('random()')}
  else if( order ) {order = order.split(","); condiciones.order = [[order[0], order[1]]];}

  if( category ) condiciones.include[0].where = {name: category}  
  if( manufacturer ) condiciones.include[1].where = {name: manufacturer}
  let products = await Product.findAndCountAll(condiciones);
  
  return {
    content: finishProducts(products.rows),
    totalPages: Math.ceil(products.count / Number.parseInt(size)),
    results: products.count
  }
}
module.exports = {
  filterProducts,
};


function filtradosDeProducts(min, max, discount, name){
  let objetito = {}
  if(discount) objetito.discount = {[Op.gte]: discount}
  if (name) objetito.name = {[Op.like]: `%${name}%`}
  if( min && max ) {objetito.price = {[Op.between]: [min, max]}}
  else if( max ) {objetito.price = {[Op.lte]: max}}
  else if( min ) {objetito.price =  {[Op.gte]: min}}
  return objetito
}