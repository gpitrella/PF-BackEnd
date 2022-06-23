const {Product,Categories, Manufacturer, Review} = require('../db')

async function getAllManufacturer(){
    try{
        let manufacturer = await Manufacturer.findAll({attributes: ['name']})
        return manufacturer
    }catch(error){
        console.log(error)
    }
}

async function createManufacturer(name, image){
    if(!name) throw new Error('must enter a name')
    name = name.toUpperCase()
    
    let findInDb = await Manufacturer.findOne({where:{name:name}})
    if(findInDb) throw new Error(`the manufacturer ${findInDb.name}  already exists`)

    let newManufacturer = await Manufacturer.create({name:name, image: image})
    return `manufacturer ${newManufacturer.name} created successfully` 
}

module.exports = {
    getAllManufacturer,
    createManufacturer
}