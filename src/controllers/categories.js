const { CanceledError } = require('axios')
const { Categories } = require('../db')
const { getById } = require('./product')

async function getAllCategories(){
    let categories = await Categories.findAll({attributes: ['name']})
    if(!categories.length) throw new Error('there are not categories')

    return categories
}

async function createCategory(name){
    if(!name) throw new Error ("a name is required for the category")
    name = name.toUpperCase()
    
    let findInDb = await Categories.findOne({where:{name:name}})
    if(findInDb) throw new Error(`the category ${findInDb.name}  already exists`)

    let newCategory = await Categories.create({name:name})
    return `category ${newCategory.name} created successfully`
}

async function getById(id) {
    if (!id) throw new Error("you must provide a product id");
  
    let categoryInDb = await Categories.findOne({where:{id}});
  
    if (!categoryInDb) throw new Error("the id does not correspond to an existing product");
  
    return categoryInDb;
  }

async function deleteCategory(id){
    await getById(id)
    await Categories.destroy({where:{id}})
    return 'The category was remove'
}

async function updateCategory(id,name){
    await getById(id)
    await Categories.update({name:name},{where:{id}})
    return 'the category was successfully updated'
}

module.exports = {
    createCategory,
    getAllCategories,
    deleteCategory,
    updateCategory
}