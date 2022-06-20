const {Product,Categories, Manufacturer, Review} = require('../db')

//No esta funcional...
async function getAllProduct(){
    try{
        let product = await Product.findAll({
            include:{
                Categories,
                Manufacturer,
                Review
            }
        })
        return product
    }catch(error){
        console.log(error)
    }
}

async function createProduct(name,price,discount,stock,description,category,manufacturer, image){
    try{
        if(name){
            let findInDb = await Product.findOne({
                where: {name:name.toLowerCase().trim()}
            })
            console.log(findInDb)
            if(!findInDb){
                let newProduct = await Product.create({
                    name:name,
                    price:price,
                    discount:discount,
                    stock:stock,
                    description:description,
                    image:image
                })
                let categoryDb = await Categories.findAll({
                    where: {name:category}
                })
                await newProduct.addCategories(categoryDb)
                let manufacturerDb = await Manufacturer.findAll({
                    where: {name:manufacturer}
                })
                await newProduct.addManufacturer(manufacturerDb)
                return newProduct
            }
            else{
                throw new Error('the product already exist')
            }
        }
        throw new Error('you must enter a name')
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    createProduct,
    getAllProduct
}