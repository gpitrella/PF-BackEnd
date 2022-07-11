const { Product, User, Purchase_order, Product_order, Useraddress, Branch_office } = require("../db");
const axios = require("axios");
const CLIENT_URL = process.env.CLIENT_URL

async function createPayment({email,items, idUser, totalpurchase, idAddress, branchOfficeId}) {
  
  const url = "https://api.mercadopago.com/checkout/preferences";
  
  const body = {
    payer_email: email,
    items,
    back_urls: {
      failure: `${CLIENT_URL}canceledbuy`,
      pending: `${CLIENT_URL}pendingbuy`,
      success: `${CLIENT_URL}successbuy`
    }
  };
  
  const payment = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
    }
  });

  let idMP = payment.data.init_point.slice(payment.data.init_point.indexOf('=')+1,payment.data.init_point.length)
  console.log("id",idMP)
  let newOrder = await Purchase_order.create({idMP, items, totalpurchase})
  let findUser= await User.findOne({where:{id:idUser}})
  let findAddress= await Useraddress.findOne({where:{id:idAddress}})
  let findSucursal = await Branch_office.findOne({where:{id:branchOfficeId}})
  
  await newOrder.addUser(findUser)
  if(findAddress) await newOrder.addUseraddress(findAddress)
  if(findSucursal) await newOrder.setBranch_office(findSucursal)
  for(product of items) await newOrder.addProduct(product.id)

  return payment.data.init_point;
}

module.exports={
    createPayment
}