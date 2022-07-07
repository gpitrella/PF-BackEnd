const {User, Favorites, Product, Categories, Manufacturer, Comments, Review} = require("../db");
const { getUserByid } = require("./user");

async function favoritePost(idUser,idProduct){
    let user = await getUserByid(idUser)
    let product = await Product.findByPk(idProduct)
    let newFav = await Favorites.create({idProduct, idUser})
    await user.addFavorites(newFav)
    await product.addFavorites(newFav)
    return 'new favorite'
}

async function deleteFavorite(idUser,idProduct){
  await Favorites.destroy({ where: { idUser, idProduct } });
}

module.exports={
    favoritePost,
    deleteFavorite
}