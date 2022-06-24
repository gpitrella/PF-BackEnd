const {Product,Categories, Manufacturer, Review} = require('../db')

async function getAllManufacturer(){
    
        let manufacturer = await Manufacturer.findAll({attributes: ['name']})
        if(!manufacturer.length) throw new Error ('there are no manufacturers')
        return manufacturer
    
}

async function createManufacturer(name, image){
    
        if(name){
            let findInDb = await Manufacturer.findOne({where:{name:name}})
            if(!findInDb){
                let newManufacturer = await Manufacturer.create({name:name, image: image})
                return `category ${newManufacturer.name} created successfully`
            }
            throw new Error('the category already exists')
        }else{
            throw new Error('You must enter a name of manufacturer')
        }
    
}

module.exports = {
    getAllManufacturer,
    createManufacturer
}