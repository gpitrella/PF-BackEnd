const {User, Favorites, Product, Categories, Manufacturer, Comments, Review} = require("../db");
const { getUserByid } = require("./user");

async function verifyDuplicateFavorite(idUser, idProduct) {
  let findInDb = await Favorites.findOne({ where: { idUser, idProduct } });
  if (findInDb)
    throw new Error(`${findInDb.name} is already a favorite`);
}

async function favoritePost(idUser,idProduct){
    let user = await getUserByid(idUser)
    let product = await Product.findByPk(idProduct)
    await verifyDuplicateFavorite(idUser, idProduct);
    let newFav = await Favorites.create({idProduct, idUser})
    await user.addFavorites(newFav)
    await product.addFavorites(newFav)
    return user.dataValues.favorites
}

async function deleteFavorite(id){
  await Favorites.destroy({ where: { id } });
  console.log('fav removed!!!!!!!!!!!')
}

module.exports={
    favoritePost,
    deleteFavorite
}