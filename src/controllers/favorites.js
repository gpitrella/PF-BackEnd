const {User, Favorites, Product, Categories, Manufacturer, Comments, Review} = require("../db");
const { getUserByid } = require("./user");

async function favoritePost(idUser,idProduct){
    let user = await getUserByid(idUser)
    let product = await Product.findByPk(idProduct)
    let newFav = await Favorites.create({idProduct, idUser})
    await user.addFavorites(newFav)
    await product.addFavorites(newFav)
    return user.dataValues.favorites
}

async function deleteFavorite({idUser,idProduct}){
  await Favorites.destroy({ where: { idUser, idProduct } });
  console.log('fav removed!!!!!!!!!!!')
}

module.exports={
    favoritePost,
    deleteFavorite
}