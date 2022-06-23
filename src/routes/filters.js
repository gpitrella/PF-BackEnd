const { Router } = require('express');
const router = Router();
const { getByName } = require('../controllers/product.js');
const { filterCategories } = require('../controllers/filters.js');

router.get('/', async(req, res)=>{
    try{
        let data = req.query
        res.json(await filterCategories(data))
    }catch(error){
        res.status(404).json(error.message)
    }
})
module.exports = router;