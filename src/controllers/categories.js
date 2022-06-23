const { Product,Categories } = require('../db')

async function getAllCategories(){
    let categories = await Categories.findAll({attributes: ['name']})
    if(!categories.length) throw new Error('there are not categories')

    return categories
}

async function createCategory(name){

    if(name){
        let findInDb = await Categories.findOne({where:{name:name}})
        if(!findInDb){
            let newCategory = await Categories.create({name:name})
            return `category ${newCategory.name} created successfully`
        }throw new Error('the category already exists')
    }else{
        throw new Error('you must enter a name')
    }

}

module.exports = {
    createCategory,
    getAllCategories,
    // filterCategories
}