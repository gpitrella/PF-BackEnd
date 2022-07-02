const {User, Favorites, Product, Categories, Manufacturer, Comments, Review} = require("../db");
const { getUserByid } = require("./user");

async function favoritePost(idUser,idProduct){
    let user = await getUserByid(idUser)
  
    let product = await Product.findByPk(idProduct, {include:[
            {
              model: Categories,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
            {
              model: Manufacturer,
              attributes: ["name", "image"],
              through: {
                attributes: [],
              },
            },
            {
              model: Comments,
              through: {
                attributes: [],
              },
            },{
                model: Favorites,
                through: {
                  attributes: [],
                },
            },
            {
                model: Review,
                through: {
                  attributes: [],
                },
            }
          ]})
    console.log('productttttttttttttttttttttttttttttt',user.dataValues.favorites)
    // if(user.dataValues.favorites.)
    let newFav = await Favorites.create({idProduct, idUser})
    await user.addFavorites(newFav)
    await product.addFavorites(newFav)
    return 'new favorite'
}
module.exports={
    favoritePost
}