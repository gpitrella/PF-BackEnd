const { Router } = require('express');
const router = Router();
const { getByName } = require('../controllers/product.js');
const { filterCategories } = require('../controllers/filters.js');

router.get('/', async(req, res)=>{
    try{
        // let { name, category, brand, min, max, order } = req.query
        // let products = false 
        // let { name, category, manufacturer, min, max, order } = req.query
        // if(name) products = await getByName(name)
        // if (category) products = await filterCategories(products, category)
        // if (min || max) products = await filterProductByPrice(products, min, max)
        // if (order === "desc") products = products.reverse()
        // if(!products) throw new Error ("a filter or sort is required")
        // res.json(products)
        res.json(await filterCategories())
    }catch(error){
        res.status(404).json(error.message)
    }
})
module.exports = router;