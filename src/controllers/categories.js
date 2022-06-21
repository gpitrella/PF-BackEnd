const {Product,Categories, Manufacturer, Review} = require('../db')

async function getAllCategories(){
    try{
        let categories = await Categories.findAll({attributes: ['name']})
        return categories
    }catch(error){
        console.log(error)
    }
}

async function createCategory(name){
    try{
        if(name){
            let findInDb = await Categories.findOne({where:{name:name}})
            if(!findInDb){
                let newCategory = await Categories.create({name:name})
                return `category ${newCategory.name} created successfully`
            }
        }else{
            throw new Error('the category already exists')
        }
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
    createCategory,
    getAllCategories
}