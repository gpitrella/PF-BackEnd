const {Product,Categories, Manufacturer, Review} = require('../db')

async function getAllManufacturer(){
    
        let manufacturer = await Manufacturer.findAll({attributes: ['name']})
        if(!manufacturer.length) throw new Error ('there are no manufacturers')
        return manufacturer
    
}

async function createManufacturer(name){
    
        if(name){
            let findInDb = await Manufacturer.findOne({where:{name:name}})
            if(!findInDb){
                let newManufacturer = await Manufacturer.create({name:name})
                return `category ${newManufacturer.name} created successfully`
            }
        }else{
            throw new Error('the category already exists')
        }
    
}

module.exports = {
    getAllManufacturer,
    createManufacturer
}