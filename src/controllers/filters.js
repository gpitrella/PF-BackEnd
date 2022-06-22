const {Product,Categories, Manufacturer, Review} = require('../db')
const { Op } = require ("sequelize");

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
  }
  
async function filterCategories(name, category, manufacturer="enzo", min , max=10, order= "name,ASC") {

    var condiciones = condicionesDeBusqueda 
      if(order) {
        order = order.split(",")
        condiciones = {
            ...condiciones,
            order : [[ order[0], order[1]]]
        }
      }
      if(category) condiciones.include[0] = {
        ...condiciones.include[0],
        where : {name: category}
      }
      if(manufacturer) condiciones.include[1] = {
        ...condiciones.include[1],
        where : {name: manufacturer}
      }
       if(min && max) {condiciones = {
        ...condiciones,
        where: {price: {[Op.between]: [min, max]}}
      }} else if(max) {condiciones = {
        ...condiciones,
        where: {price: {[Op.lte]: max}}
      }}else if(min) {condiciones = {
        ...condiciones,
        where: {price: {[Op.gte]: min}}
      }} 


    let products = await Product.findAll(condiciones);
      products = products.map((product) => {
        return {
          ...product.dataValues,
          categories: product.categories?.map((product) => product.name),
          manufacturers: product.manufacturers?.map((product) => product.name),
        };
      });
        return products
}
module.exports = {
    filterCategories
}