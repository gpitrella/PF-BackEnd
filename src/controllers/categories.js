const { Categories } = require('../db')

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

module.exports = {
    createCategory,
    getAllCategories
}