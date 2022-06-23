const {Product,Categories, Manufacturer} = require('../db');
const { Op } = require ("sequelize");

async function searchBar(name){
  if(name){
    const searchProduc = await Product.findAll({
        where: {    
            name: { [Op.like]: `%${name.toUpperCase()}%`},
        },
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
        raw: true,
    }).catch(error=>error.message);
    return searchProduc
}else {
  throw new Error ('Must enter a Name..!')
}
}
module.exports={
  searchBar
}