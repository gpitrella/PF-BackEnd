const { Product, Comments } = require("../db");

async function createComment(comment, product) {
    if (!product) throw new Error("you must provide a product name");
    if (!comment) throw new Error("you must provide a comment");
  
    let productInDb = await Product.findOne({ where: { name: product.toUpperCase() } });
    console.log("llegue")
    if (!productInDb) throw new Error("the product does not exist");

    let newComment = await Comments.create({comment :comment.toUpperCase()});
    await productInDb.addComments(newComment);
  
    return (newComment);
  }

module.exports = {
    createComment,
  };