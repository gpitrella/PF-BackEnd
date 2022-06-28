const { Product, Comments } = require("../db");

async function createComment(comment, id) {
    if (!id) throw new Error("you must provide a product id");
    if (!comment) throw new Error("you must provide a comment");
    
    let productInDb = await Product.findByPk(Number.parseInt(id));
    if (!productInDb) throw new Error("the product does not exist");

    let newComment = await Comments.create({comment :comment.toUpperCase()});
    await productInDb.addComments(newComment);
  
    return (newComment);
  }

module.exports = {
    createComment,
  };