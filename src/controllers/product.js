const {Product,Categories, Manufacturer, Review} = require('../db')

async function getAllProduct(){
    try{
        let product = await Product.findAll({
            include:[{
                model:Categories,
                attributes: ['name'],
                through:{
                    attributes:[],
                }
            },{
                model:Manufacturer,
                attributes: ['name'],
                through:{
                    attributes:[],
                }
            }]
        })
        console.log(product)
        product= product.map(m=>{
            return {
            ...m.dataValues, 
            categories: m.categories?.map(m=>m.name),
            manufacturers: m.manufacturers?.map(m=>m.name)
        }})
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
                throw new Error('the product already exists')
            }
        }
        throw new Error('you must enter a name')
    }catch(error){
        console.log(error)
    }
}

async function getByName(name){

    
        if(name){
            let productInDb = await Product.findOne({
                where: {name:name},
                include:[{
                    model:Categories,
                    attributes: ['name'],
                    through:{
                        attributes:[],
                    }
                },{
                    model:Manufacturer,
                    attributes: ['name'],
                    through:{
                        attributes:[],
                    }
                }]
            })
            console.log(productInDb)
            let product = []
            product.push(productInDb)
            if(!productInDb) throw new Error('the product does not exist')
            product= product.map(m=>{
                return {
                ...m.dataValues, 
                categories: m.categories?.map(m=>m.name),
                manufacturers: m.manufacturers?.map(m=>m.name)
            }})
            console.log(product)
            return product
            }           
            else{
                throw new Error('you must provide a product name')
            }
       
    
}

async function getById(id){


        if(id){
            let productInDb = await Product.findByPk(id, {
                
                include:[{
                    model:Categories,
                    attributes: ['name'],
                    through:{
                        attributes:[],
                    }
                },{
                    model:Manufacturer,
                    attributes: ['name'],
                    through:{
                        attributes:[],
                    }
                }]
            })
            
            let product = []
            product.push(productInDb)
            product = product.map(m=>{
                return {
                ...m.dataValues, 
                categories: m.categories?.map(m=>m.name),
                manufacturers: m.manufacturers?.map(m=>m.name)
            }})
             
            return product
            }           
            else{
                throw new Error('you must provide a product id')
            }
       
}

module.exports = {
    createProduct,
    getAllProduct,
    getByName,
    getById
}