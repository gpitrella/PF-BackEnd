const { Product, User, Purchase_order, Product_order, Useraddress, Branch_office } = require("../db");
const axios = require("axios");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");

async function createPayment({email,items, idUser, status, idAddress, branchOfficeId,subject,text,html}) {
  
  
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
  console.log("id",idMP)
  let newOrder = await Purchase_order.create({idMP, items})
  let findUser= await User.findAll({where:{id:idUser}})
  let findAddress= await Useraddress.findAll({where:{id:idAddress}})
  let findSucursal = await Branch_office.findAll({where:{id:branchOfficeId}})
  
  newOrder.addUser(findUser)
  if(findAddress.length)newOrder.addUseraddress(findAddress)
  if(findSucursal.length)newOrder.addBranch_office(findSucursal)

  try{
    sgMail.setApiKey("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")
    await sgMail.send({
      to: 'techmarketpf@gmail.com',
      from: "nicolasexeburgos@gmail.com",
      subject,
      text,
      html,
    });
  }catch(error){
    console.log(error)
  }

  return payment.data.init_point;
}

module.exports={
    createPayment
}