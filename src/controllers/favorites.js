const { Favorites, Product } = require("../db");
const { getUserByid } = require("./user");

async function favoritePost(idUser,idProduct){
    let favoriteDuplicate = await Favorites.findOne({where:{idProduct, idUser} })
    if(favoriteDuplicate) throw new Error ('this product is already in your favorites list')
    
    let user = await getUserByid(idUser)
    let product = await Product.findByPk(idProduct)
    let newFav = await Favorites.create({idProduct, idUser})
    await user.addFavorites(newFav)
    await product.addFavorites(newFav)
    return newFav
}

async function deleteFavorite(id){
  await Favorites.destroy({ where: { id } });
  return 'the favorite was deleted'
}

module.exports={
    favoritePost,
    deleteFavorite
}