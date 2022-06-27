const { Manufacturer } = require('../db')

async function getAllManufacturer(){
    let manufacturer = await Manufacturer.findAll({attributes: ['name','image']})
    return manufacturer
}

async function createManufacturer(name, image){
    if(!name) throw new Error('must enter a name')
    name = name.toUpperCase()
    
    let findInDb = await Manufacturer.findOne({where:{name:name}})
    if(findInDb) throw new Error(`the manufacturer ${findInDb.name}  already exists`)

    let newManufacturer = await Manufacturer.create({name:name, image: image})
    return `manufacturer ${newManufacturer.name} created successfully` 
}

async function deleteManufacturer(id){
    await Manufacturer.destroy({where:{id}})
    return 'The manufacturer was remove'
}
module.exports = {
    getAllManufacturer,
    createManufacturer,
    deleteManufacturer
}