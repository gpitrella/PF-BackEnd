const { Product, Review } = require("../db");
const { verifyProductId } = require("./product.js");

async function createReview(comment, score, id) {
    let productInDb = await verifyProductId(id)
    if (!comment) throw new Error("you must provide a comment");
    if (!score) throw new Error("you must provide a score");

    score = Number.parseInt(score)
    if(!( 1 <= score <= 5)) throw new Error("you must provide a valid score");

    let newReview = await Review.create({comment :comment.toUpperCase(), score: score});
    await productInDb.addReview(newReview);
  
    return (newReview);
  }

module.exports = {
    createReview,
  };