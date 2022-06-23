const { Router } = require('express');
const { searchBar } = require('../controllers/search');
const router = Router();

router.get('/',async(req,res)=>{
    try {
        let{name}=req.query;
        res.json(await searchBar(name))
    } catch (error) {
        res.json(error.message)
    }
})

module.exports = router;