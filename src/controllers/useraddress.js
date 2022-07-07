const {User, Useraddress} = require("../db");
const { getUserByid } = require("./user");

async function getAddress(){
    let allAddress = await Useraddress.findAll();
    if(allAddress.length===0) throw new Error('no addresses')
    return allAddress;
}

async function createUsAddress(id,{street, street_height, city, zipcode}){
    let userId = await getUserByid(id);
    if(userId.useraddresses.length<3){
        let address = await Useraddress.create({photo, phone_number, street, street_height, city, zipcode})
        userId.addUseraddress(address);
        return 'address added successfully';
    }else{
        throw new Error('you have exceeded the address limit');
    }
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