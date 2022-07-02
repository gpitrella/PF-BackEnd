const { Product, Review,Categories,Manufacturer,Comments } = require("../db");
const { getById } = require("./product");
const { getUserByid } = require("./user");

async function createReview(comment, score, idProduct, idUser) {
  console.log(comment, score, idProduct, idUser)
    if (!idProduct) throw new Error("you must provide a product id");
    if (!comment) throw new Error("you must provide a comment");
    if (!score) throw new Error("you must provide a score");
    score = Number.parseInt(score)
    if(!( 1 <= score <= 5)) throw new Error("you must provide a valid score");

    let productInDb = await Product.findByPk(idProduct, {include: [
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
      }}
    ]})
    if (!productInDb) throw new Error("the product does not exist");
    
    let userById = await getUserByid(idUser)
    if (!userById) throw new Error("the user does not exist");
    console.log('dolaaaaaaar',productInDb)
    if(userById.dataValues.reviews.length<1){
      let newReview = await Review.create({comment :comment.toUpperCase(), score: score});
      //productInDb.addReview(newReview);
      productInDb.addReview(newReview)
      userById.addReview(newReview)
      return 'added review'
    }else{
      throw new Error('you have already added a review')
    }
  }

module.exports = {
    createReview,
  };