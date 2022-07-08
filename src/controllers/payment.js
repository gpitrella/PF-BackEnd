const { Product, User, Purchase_order, Product_order, Useraddress, Branch_office } = require("../db");
const axios = require("axios");

async function createPayment({email,items, idUser, status, idAddress, branchOfficeId}) {
  
  
  const url = "https://api.mercadopago.com/checkout/preferences";
  
  const body = {
    payer_email: email,
    items,
    back_urls: {
      failure: "/failure",
      pending: "/pending",
      success: "/success"
    }
  };
  
  const payment = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
    }
  });

  let idMP = payment.data.init_point.slice(payment.data.init_point.indexOf('=')+1,payment.data.init_point.length)
  console.log(idMP)
  let newOrder = await Purchase_order.create({idMP, items})
  let findUser= await User.findAll({where:{id:idUser}})
  let findAddress= await Useraddress.findAll({where:{id:idAddress}})
  let findSucursal = await Branch_office.findAll({where:{id:branchOfficeId}})
  
  newOrder.addUser(findUser)
  if(findAddress.length)newOrder.addUseraddress(findAddress)
  if(findSucursal.length)newOrder.addBranch_office(findSucursal)

  return payment.data.init_point;
}

module.exports={
    createPayment
}