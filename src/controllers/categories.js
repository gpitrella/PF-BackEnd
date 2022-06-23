const { Product,Categories } = require('../db')

async function getAllCategories(){
    let categories = await Categories.findAll({attributes: ['name']})
    if(!categories.length) throw new Error('there are not categories')

    return categories
}

async function createCategory(name){
    if(!name) throw new Error ("a name is required for the category")

    let findInDb = await Categories.findOne({where:{name:name}})
    if(findInDb.length) throw new Error('the category already exists')

    let newCategory = await Categories.create({name:name})
    return `category ${newCategory.name} created successfully`
}
// CREO QUE NO ES NECESARIA LA FUNCION
// async function filterCategories(category){
//     let findInDb = Categories.findAll({where:{name:category},include:[
//         {
//           model: Product,
//           through: {
//             attributes: []
//           },
//         }]
//       })
//     if(findInDb){
//         return findInDb
//     }
//     throw new Error('the category does not exists')
// }

module.exports = {
    createCategory,
    getAllCategories,
    // filterCategories
}