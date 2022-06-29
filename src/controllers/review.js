const { Product, Review } = require("../db");

async function createReview(comment, score, id) {
    if (!id) throw new Error("you must provide a product id");
    if (!comment) throw new Error("you must provide a comment");
    if (!score) throw new Error("you must provide a score");
    score = Number.parseInt(score)
    if(!( 1 <= score <= 5)) throw new Error("you must provide a valid score");

    let productInDb = await Product.findByPk(Number.parseInt(id));
    if (!productInDb) throw new Error("the product does not exist");

    let newReview = await Review.create({comment :comment.toUpperCase(), score: score});
    await productInDb.addReview(newReview);
  
    return (newReview);
  }

module.exports = {
    createReview,
  };