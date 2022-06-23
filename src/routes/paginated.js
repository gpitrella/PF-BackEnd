const { paginatedHome } = require("../controllers/paginated");
const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
    try{    
        const pageAsNumber = Number.parseInt(req.query.page);
        const sizeAsNumber = Number.parseInt(req.query.size);
        console.log(req.query)
        const {name, category, manufacturer, min, max, order} = req.query
        res.json(await paginatedHome(pageAsNumber,sizeAsNumber, name, category, manufacturer, min, max, order));
    }catch(error){
        console.log(error)
    }
})

module.exports = router;