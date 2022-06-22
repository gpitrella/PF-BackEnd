const { paginatedHome } = require("../controllers/paginated");
const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
    try{    
        const pageAsNumber = Number.parseInt(req.query.page);
        const sizeAsNumber = Number.parseInt(req.query.size);
        res.json(await paginatedHome(pageAsNumber,sizeAsNumber));
    }catch(error){
        console.log(error)
    }
})

module.exports = router;