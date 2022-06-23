const { Product,Categories } = require('../db')

async function getAllCategories(){
    let categories = await Categories.findAll({attributes: ['name']})
    if(!categories.length) throw new Error('there are not categories')

    return categories
}

async function createCategory(name){
<<<<<<< HEAD
    if(!name) throw new Error ("a name is required for the category")
    name = name.toUpperCase()
    
    let findInDb = await Categories.findOne({where:{name:name}})
    if(findInDb) throw new Error('the category already exists')
=======

    if(name){
        let findInDb = await Categories.findOne({where:{name:name}})
        if(!findInDb){
            let newCategory = await Categories.create({name:name})
            return `category ${newCategory.name} created successfully`
        }throw new Error('the category already exists')
    }else{
        throw new Error('you must enter a name')
    }
>>>>>>> 6505e8faf92ed3c6d1aba43cef7da901e308e9d4

}

module.exports = {
    createCategory,
    getAllCategories,
    // filterCategories
}