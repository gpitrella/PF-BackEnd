const {Product,Categories, Manufacturer} = require('../db');
const { Op } = require ("sequelize");
async function searchBar(name){
    const searchProduc = await Product.findAll({
        where: {    
            name: { [Op.like]: `%${name}%`},
        },//deberiamos estandarizar los nombres
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
}

module.exports={
  searchBar
}