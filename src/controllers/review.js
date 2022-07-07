const { Product, Review, User, Purchase_order } = require("../db");
const { getUserByid } = require("./user");

async function createReview(comment, score, idProduct, idUser) {
    if (!comment) throw new Error("you must provide a comment");
    if(!/^[1-5]$/.test(score)) throw new Error("you must provide a score must be a number between one and five");
    if(!idProduct && !/^[0-9]*$/.test(score)) throw new Error("you must send a valid product id");

    let productInDb = await Product.findByPk(idProduct)
    let userInDb = await getUserByid(idUser)

    let reviewInDb = await Review.findAll({include:[{model:User, where: { id : idUser }}, {model: Product, where: { id : idProduct }}]});
    let purchase_orderInDb = await Purchase_order.findAll({include:[{model:User, where: { id : idUser }}, {model: Product, where: { id : idProduct }}]});
    if(reviewInDb.length >= purchase_orderInDb.length) throw new Error('you have already added a review for each purchase')

    let newReview = await Review.create({comment :comment.toUpperCase(), score });
    await productInDb.addReview(newReview)
    await userInDb.addReview(newReview)
    return 'added review'
  }

module.exports = {
    createReview,
  };