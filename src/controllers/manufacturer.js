const {Product,Categories, Manufacturer, Review} = require('../db')

async function getAllManufacturer(){
    try{
        let manufacturer = await Manufacturer.findAll({attributes: ['name']})
        return manufacturer
    }catch(error){
        console.log(error)
    }
}

async function createManufacturer(name){
    try{
        if(name){
            let findInDb = await Manufacturer.findOne({where:{name:name}})
            if(!findInDb){
                let newManufacturer = await Manufacturer.create({name:name})
                return `category ${newManufacturer.name} created successfully`
            }
        }else{
            throw new Error('the category already exists')
        }
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
    getAllManufacturer,
    createManufacturer
}