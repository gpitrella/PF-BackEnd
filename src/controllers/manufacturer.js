const {Product,Categories, Manufacturer, Review} = require('../db')

async function getAllManufacturer(){
        let manufacturer = await Manufacturer.findAll({attributes: ['name']})
        if(!manufacturer.length) throw new Error ('there are no manufacturers')
        return manufacturer
    
}

async function createManufacturer(name, image){
    if(!name) throw new Error('must enter a name')
    name.toUpperCase()
    
    let findInDb = await Manufacturer.findOne({where:{name:name}})
    if(findInDb) throw new Error('the manufacturer already exists')

    let newManufacturer = await Manufacturer.create({name:name, image: image})
    return `manufacturer ${newManufacturer.name} created successfully` 
}

module.exports = {
    getAllManufacturer,
    createManufacturer
}