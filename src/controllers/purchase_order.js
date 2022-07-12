const { User, Purchase_order, Branch_office } = require("../db");
const { getUserByid } = require("./user");
const { Op } = require("sequelize");
const image = "https://res.cloudinary.com/techmarket/image/upload/v1657452330/rwbzsixizmehnudxgtg0.gif"

require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const API_KEY = process.env.SENDGRID_API_KEY
sgMail.setApiKey(API_KEY)

const TODAY_START = new Date().setHours(0,0,0,0)
const NOW = new Date()
let TODAY = new Date()
const LAST_WEEK = TODAY.setDate(TODAY.getDate() - 7)
TODAY = new Date()
const LAST_MONTH = TODAY.setDate(TODAY.getDate() - 30)
TODAY = new Date()
const BEFORE_LAST_MONTH = TODAY.setDate(TODAY.getDate() - 60)
TODAY = new Date()
const LAST_THREE_MONTH = TODAY.setDate(TODAY.getDate() - 90)

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
  if(!/^[1-9][0-9]*$/.test(id)) throw new Error("you must provide a valid id");
  if(!['pending','processing','cancelled','sending','filled'].includes(status)) throw new Error("you must provide a valid status");

  
  let purchase_order = await Purchase_order.findByPk(id,{attributes:["status"],through: {attributes: []}})
  if(!purchase_order) throw new Error("there no exist a purchase order with that id");
  if(!['pending','processing','sending'].includes(purchase_order.dataValues.status)) throw new Error("it is no longer possible to update the purchase order");
  await Purchase_order.update({status}, {where : { id }})
  let orderUser=await Purchase_order.findByPk(id,{ include: { all: true, nested: true }})
  let email = orderUser.dataValues.users[0].dataValues.email
  
  try{
    const msg={
      to: email,
      from: "techmarketpf@gmail.com",
      subject:"Purchese Order",
      text:"Your purchase order is being processed",
      html:`<h1>Your purchase order is being ${status}</h1>`
    }
    await sgMail.send(msg);
    }catch(error){
      console.log(error)
  }
  return `status was successfully updated to ${status}`
}

async function getAllOrders(){
    let orders = await Purchase_order.findAll({include:[
      {association:'products', attributes:["id","name"], through: {attributes:[]}},
      {association:'users', attributes:["id","name","email"], through:{attributes:[]}},
      {association:'useraddresses', through:{attributes:[]}},
      {model: Branch_office}
    ]})
    return orders
}

// Agregar para buscar una orden por id.
async function getOrderDetails(id) {
  let order = await Purchase_order.findOne({
    where: { id: id },
    include: [
      {association:'products', attributes:["id","name"], through: {attributes:[]}},
      {association:'users', attributes:["id","name","email"], through:{attributes:[]}},
      {association:'useraddresses', through:{attributes:[]}},
      {model: Branch_office}
    ]});

  if (!order) throw new Error("there no exist a purchase order with that id");

  return order;
}

async function usersOrders(id){
    let uOrders = await User.findByPk(id,{include:
      {association:'purchase_orders', through:{attributes:[]}},
    })
    return uOrders
}

async function countAllOrders(){
  const {count} = await Purchase_order.findAndCountAll()
  return count
}

async function sumAllOrders(){
  const totalsales = await Purchase_order.sum('totalpurchase', {
    where: {
      status: 'filled'
    }
  })
  return totalsales
}

async function sumAllToday(){
  const totalsalestoday = await Purchase_order.sum('totalpurchase', {
    where: {
      status: 'filled',
       createdAt: { 
        [Op.between]: [TODAY_START, NOW]
      },
        
    }
  })
  return totalsalestoday
}

async function sumLastWeek(){

  const lastweeksales = await Purchase_order.sum('totalpurchase', {
    where: {
      status: 'filled',
       createdAt: { 
        [Op.between]: [LAST_WEEK, TODAY_START]
      },
        
    }
  })
  return lastweeksales
}

async function sumLastMonth(){

  const lastmonthsales = await Purchase_order.sum('totalpurchase', {
    where: {
      status: 'filled',
       createdAt: { 
        [Op.between]: [LAST_MONTH, TODAY_START]
      },
        
    }
  })
  return lastmonthsales
}

async function sumBeforeLastMonth(){

  const beforelastmonthsales = await Purchase_order.sum('totalpurchase', {
    where: {
      status: 'filled',
       createdAt: { 
        [Op.between]: [BEFORE_LAST_MONTH, LAST_MONTH]
      },
        
    }
  })
  return beforelastmonthsales
}

async function sumLastThreeMonth(){

  const lastthreemonthsales = await Purchase_order.sum('totalpurchase', {
    where: {
      status: 'filled',
       createdAt: { 
        [Op.between]: [LAST_THREE_MONTH, BEFORE_LAST_MONTH]
      },
        
    }
  })
  return lastthreemonthsales
}

async function getOrdersToday(){
  let orderstoday = await Purchase_order.findAll({
    where: {
       createdAt: { 
        [Op.between]: [TODAY_START, NOW]
      },
        
    },
    include:[
    {association:'products', attributes:["id","name"], through: {attributes:[]}},
    {association:'users', attributes:["id","name"], through:{attributes:[]}},
    {association:'useraddresses', through:{attributes:[]}},
    {model: Branch_office}
  ]})
  return orderstoday
}

module.exports={
    // postPurchase_order,
    getAllOrders,
    updateStatus,
    usersOrders,
    countAllOrders,
    sumAllOrders,
    sumAllToday,
    sumLastWeek,
    sumLastMonth,
    sumBeforeLastMonth,
    sumLastThreeMonth,
    getOrdersToday,
    getOrderDetails // Agregar para buscar una orden por id.
}