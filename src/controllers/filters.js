const {Product,Categories, Manufacturer, Review} = require('../db')

async function filterCategories(category){
    // let findInDb = Categories.findAll({where:{name:category},include:[
    //     {
    //       model: Product,
    //       through: {
    //         attributes: []
    //       },
    //     }]
    //   })

    const CATEGORY = "compus"
    let products = await Product.findAll({
        include: [
          {
            model: Categories,
            attributes: ["name"],
            where: {name : "compus"},
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
      });
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