const { Product, Comments } = require("../db");
const { getUserByid } = require("./user");

async function createComment(comment, idProduct, idUser) {
    if (!idProduct) throw new Error("you must provide a product id");
    if (!comment) throw new Error("you must provide a comment");
    let productInDb = await Product.findByPk(idProduct)
    let userInDb = await getUserByid(idUser)
    if (!productInDb) throw new Error("the product does not exist");

    let newComment = await Comments.create({comment :comment.toUpperCase()});
    productInDb.addComments(newComment);
    userInDb.addComments(newComment)
    return 'the comment was send';
  }
  
  async function getAllComments(){
    let comments = await Comments.findAll({include: [
      {association: 'products', attributes:['id','name'], through:{attributes:[]}},
      {association: 'users', attributes:['id','name'], through:{attributes:[]}}]});
    if(comments.length) return comments
    else "there are no comments"
  }

  async function createAnswer(idComment,answer){
    let rescomment = await Comments.update({answer}, {where:{ id: idComment }})
    return rescomment
  }

  async function updateViewed(idComment,viewed){
    let updateViewed = await Comments.update({viewed}, {where:{ id: idComment }})
    return updateViewed
  }

module.exports = {
    createComment,
    getAllComments,
    createAnswer,
    updateViewed
  };