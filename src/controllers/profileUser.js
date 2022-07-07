const { Favorites, Review, User, Purchase_order, Product } = require("../db");

function deleteProperty(array, property) {
  array.forEach(a => delete a.dataValues[property])
  return array
}

async function verifyUserId(id) {
  if (!id) throw new Error("you must provide a User id");
  if (!/^[0-9]*$/.test(id)) throw new Error("the id must be a number");

  let UserInDb = await User.findByPk(id);
  if (!UserInDb) throw new Error("the id does not correspond to an existing user");

  return UserInDb;
}

async function getUserReviews(id) {
  await verifyUserId(id) 
  let UserReviews = await Review.findAll({ include: [{model: User, through: { attributes: [] }, where: { id }}, {model: Product, through: { attributes: [] }}] });
  UserReviews = deleteProperty(UserReviews, "users")
  return UserReviews;
}

async function getUserFavorites(id) {
  await verifyUserId(id) 
  let userFavorites = await Product.findAll({ include: [{model: Favorites, through: { attributes: [] }, where: { idUser: id }}] });
  userFavorites = deleteProperty(userFavorites, "favorites")
  return userFavorites;
}

async function getUserPurchase_Orders(id) {
  await verifyUserId(id)
  let UserPurchaseorders = await Purchase_order.findAll({ include: [{model: User, through: { attributes: [] }, where: { id }}, {model: Product, through: { attributes: [] }}] });
  UserPurchaseorders = deleteProperty(UserPurchaseorders, "users")
  return UserPurchaseorders;
}

module.exports = { getUserFavorites, getUserReviews, getUserPurchase_Orders };
