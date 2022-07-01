const { Product, Comments, User, Categories, Manufacturer, Useraddress } = require("../db");
const { getById } = require("./product");
const { getUserByid } = require("./user");

async function createComment(comment, idProduc, idUser) {
    if (!idProduc) throw new Error("you must provide a product id");
    if (!comment) throw new Error("you must provide a comment");
    let productInDb = await Product.findByPk(idProduc, {include: [
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
      }
    ]})
    let userInDb = await getUserByid(idUser)
    if (!productInDb) throw new Error("the product does not exist");

    console.log('aaaaaaaaaaaaaaaaaaaaa',userInDb.dataValues.comments.length)
    let newComment = await Comments.create({comment :comment.toUpperCase()});
    productInDb.addComments(newComment);
    userInDb.addComments(newComment)
    return 'the comment was send';
  }

module.exports = {
    createComment,
  };