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
//ME TRAE LOS PRODUCTOS DE ESA CATEGORIA PERO NO SU MANUFACTURER
async function filterCategories(category){
    let findInDb = Categories.findAll({where:{name:category},include:[
        {
          model: Product,
          through: {
            attributes: []
          },
        }]
      })
    if(findInDb){
        return findInDb
    }
    throw new Error('the category does not exists')
}

module.exports = {
    createCategory,
    getAllCategories,
    filterCategories
}