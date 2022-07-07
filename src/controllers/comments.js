const { Product, Comments, User, Categories, Manufacturer, Useraddress, Review } = require("../db");
const { getById } = require("./product");
const { getUserByid } = require("./user");

async function createComment(comment, idProduct, idUser) {
    if (!idProduct) throw new Error("you must provide a product id");
    if (!comment) throw new Error("you must provide a comment");
    const productInDb = await Product.findByPk(idProduct, {include: [
      {
        model: Categories,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      {
        model: Manufacturer,
        attributes: ["name", "image"],
        through: {
          attributes: [],
        },
      },
      {
        model: Comments,
        through: {
          attributes: [],
        },
      },
      {
        model: Review,
        through: {
          attributes: [],
        },
      }
    ]})
    let userInDb = await getUserByid(idUser)
    if (!productInDb) throw new Error("the product does not exist");

    let newComment = await Comments.create({comment :comment.toUpperCase()});
    productInDb.addComments(newComment);
    userInDb.addComments(newComment)
    return 'the comment was send';
  }
  
  async function getAllComments(){
    let comments = await Comments.findAll({include: [
      {
        model: Product,
        attributes: ["id","name"],
        through: {
          attributes: [],
        },
      },
      {
        model: User,
        attributes: ["id","name"],
        through: {
          attributes: [],
        },
      }]});
    if(comments.length) return comments
    else "there are no comments"
  }

  async function createAnswer(idComment,answer){
    let rescomment = await Comments.update({answer}, {where:{ id: idComment }})
    console.log(rescomment)
    return rescomment
  }
module.exports = {
    createComment,
    getAllComments,
    createAnswer
  };