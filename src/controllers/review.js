const { Product, Review,Categories,Manufacturer,Comments, User } = require("../db");
const { getById } = require("./product");
const { getUserByid } = require("./user");

async function createReview(comment, score, idProduct, idUser) {
    if (!comment) throw new Error("you must provide a comment");
    if (!score) throw new Error("you must provide a score");
    if(!/^[1-5]*$/.test(score)) throw new Error("the score must be a number between one and five");

    let productInDb = await getById(idProduct)
    let userInDb = await getUserByid(idUser)

    let ReviewInDb = await Review.findOne({include:[{model:User, where: { id : idUser }}, {model: Product, where: { id : idProduct }}]});
    if(ReviewInDb) throw new Error('you have already added a review')

    let newReview = await Review.create({comment :comment.toUpperCase(), score: score});
    await productInDb.addReview(newReview)
    await userInDb.addReview(newReview)
    return 'added review'
  }

module.exports = {
    createReview,
  };