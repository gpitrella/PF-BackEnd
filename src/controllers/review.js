const { Product, Review } = require("../db");
const { getUserByid } = require("./user");

async function createReview(comment, score, idProduct, idUser) {
    if (!idProduct) throw new Error("you must provide a product id");
    if (!comment) throw new Error("you must provide a comment");
    if (!score) throw new Error("you must provide a score");
    score = Number.parseInt(score)
    if(!( 1 <= score <= 5)) throw new Error("you must provide a valid score");

    let productInDb = await Product.findByPk(Number.parseInt(idProduct));
    if (!productInDb) throw new Error("the product does not exist");
    
    let userById = await getUserByid(idUser)
    if (!userById) throw new Error("the user does not exist");
    
    if(userById.dataValues.comments.length<1){
      let newReview = await Review.create({comment :comment.toUpperCase(), score: score});
      await productInDb.addReview(newReview);
      await userById.addReview(newReview)
      return 'added review'
    }else{
      throw new Error('you have already added a review')
    }
  }

module.exports = {
    createReview,
  };