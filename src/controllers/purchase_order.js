const { Product, User, Purchase_order, Product_order, Useraddress, Branch_office } = require("../db");

// async function postPurchase_order({ idProduct, idUser,total, description, idMP, status, idAddress, branchOfficeId, items}){
//     let newOrder = await Purchase_order.create({ total, status, idMP, description, items})
//     let findProduct = await Product.findAll({where:{id:idProduct}})
//     let findUser= await User.findAll({where:{id:idUser}})
//     let findAddress= await Useraddress.findAll({where:{id:idAddress}})
//     let findSucursal = await Branch_office.findAll({where:{id:branchOfficeId}})

//     newOrder.addProduct(findProduct)
//     newOrder.addUser(findUser)
//     //newOrder.addUseraddress(findAddress)
//     //newOrder.addBranch_office(findSucursal)

//     return newOrder
// }

async function updateStatus(id,status){
    let update = await Purchase_order.update({status},{where:{id}})
    return update
}

async function getAllOrders(){
    let orders = await Purchase_order.findAll({include: [
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
        },
        // {
        //     model: Useraddress,
        //     through: {
        //     attributes: [],
        //     },
        // },
        // {
        //     model: Branch_office,
        //     through: {
        //     attributes: [],
        // },
        //}
    ]})
    return orders
}

async function usersOrders(id){
    let uOrders = await User.findByPk(id,{include:
        {
            model: Purchase_order,
            through: {
              attributes: [],
            },
          }
    })
    return uOrders
}

module.exports={
    // postPurchase_order,
    getAllOrders,
    updateStatus,
    usersOrders
}