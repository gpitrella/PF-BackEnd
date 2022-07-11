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
  console.log('email:', email)
  console.log('items:', items)
  console.log('iduser:', idUser)
  console.log('total:', totalpurchase)
  console.log('idadress:', idAddress)
  console.log('sucursal:',branchOfficeId)
  const payment = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
    }
  });

  let idMP = payment.data.init_point.slice(payment.data.init_point.indexOf('=')+1,payment.data.init_point.length)
  console.log("id",idMP)
  let newOrder = await Purchase_order.create({idMP, items, totalpurchase})
  let findUser= await User.findAll({where:{id:idUser}})
  let findAddress= await Useraddress.findAll({where:{id:idAddress}})
  let findSucursal = await Branch_office.findAll({where:{id:branchOfficeId}})
  console.log(findSucursal)
  
  await newOrder.addUser(findUser)
  if(findAddress.length) await newOrder.addUseraddress(findAddress)
  await newOrder.addBranch_office(findSucursal)
  items.map((product) => {
    newOrder.addProduct(product.id)
  })

  return payment.data.init_point;
}

module.exports={
    createPayment
}