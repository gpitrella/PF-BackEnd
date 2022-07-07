const { Product, User, Purchase_order, Product_order } = require("../db");

async function postPurchase_order({ idProduct, idUser,total, description, quantity, status, sucursal}){
    let newOrder = await Purchase_order.create({ total, sucursal, status, description})
    let findProduct = await Product.findAll({where:{id:idProduct}})
    let findUser= await User.findAll({where:{id:idUser}})
    console.log(findProduct)
    newOrder.addProduct(findProduct)
    newOrder.addUser(findUser)
    
    return newOrder
}

async function getAllOrders(){
    let orders = await Purchase_order.findAll({include: [
        {
          model: Product,
          attributes: ["id","name","quantity"],
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
        }]})
    return orders
}

module.exports={
    postPurchase_order,
    getAllOrders
}