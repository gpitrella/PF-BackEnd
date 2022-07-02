const { Manufacturer } = require('../db')

const excludeTimeStamps = {attributes: {exclude: ['updatedAt','createdAt']}}

function verifyManufacturerName(name){
    if (!name) throw new Error("a name is required for the manufacturer");
    return name.toUpperCase();
  }

  async function verifyDuplicateManufacturer(name) {
    let findInDb = await Manufacturer.findOne({ where: { name } });
    if (findInDb) throw new Error(`the manufacturer ${findInDb.name}  already exists`);
  }

  async function verifyManufacturerId(id) {
    if (!id) throw new Error("you must provide a manufacturer id");
    if(!/^[0-9]*$/.test(id)) throw new Error("the id must be a number");
  
    let manufacturerInDb = await Manufacturer.findByPk(id, excludeTimeStamps);
  
    if (!manufacturerInDb) throw new Error("the id does not correspond to an existing manufacturer");
  
    return manufacturerInDb;
  }

async function getAllManufacturer(){
    let manufacturer = await Manufacturer.findAll(excludeTimeStamps)
    return manufacturer
}

async function createManufacturer(name, image){
    name = verifyManufacturerName(name)
    await verifyDuplicateManufacturer(name)

    let newManufacturer = await Manufacturer.create({ name, image })
    return `manufacturer ${newManufacturer.name} created successfully` 
}

async function deleteManufacturer(id){
    await verifyManufacturerId(id)
    await Manufacturer.destroy({where:{id}})
    return 'The manufacturer was remove'
}

async function updateManufacturer(id, name, image){
    if(name) name = verifyManufacturerName(name)
    verifyManufacturerId(id)
    await Manufacturer.update({name, image},{where:{id}})
    return 'the Manufacturer was successfully updated'
}

module.exports = {
    getAllManufacturer,
    createManufacturer,
    deleteManufacturer,
    updateManufacturer
}