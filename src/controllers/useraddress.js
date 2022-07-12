const {User, Useraddress} = require("../db");
const { getUserByid } = require("./user");

async function getAddress(){
    let allAddress = await Useraddress.findAll();
    if(allAddress.length===0) throw new Error('no addresses')
    return allAddress;
}

async function createUsAddress(id,{direction, latitude, longitude}){
    let userId = await getUserByid(id);
    if(userId.useraddresses.length >= 3) throw new Error('you have exceeded the address limit');

    let address = await Useraddress.create({direction, latitude, longitude})
    userId.addUseraddress(address);

    return 'address added successfully';
}

async function deletAddress(id){
    await Useraddress.destroy({where:{id}})
    return 'The Address was remove'
}

module.exports={
    createUsAddress,
    getAddress,
    deletAddress
}