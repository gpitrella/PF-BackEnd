const { Router } = require('express');
const { getUsers, createUser, updateUser, deleteUser, updateStatus, getUserByid } = require('../controllers/user');
const router = Router();

router.get('/',async(req,res)=>{
    try{
        res.json(await getUsers())
    }catch(error){
        res.json(error.message)
    }
})

router.get('/:id',async(req,res)=>{
    try {
        let {id} = req.params
        res.json(await getUserByid(id))
    } catch (error) {
        res.json(error.message)
    }
})

router.post('/', async(req,res)=>{
    let data = req.body
    try {
        res.json(await createUser(data))
    } catch (error) {
        res.json(error.message)
    }
})

router.put('/:id', async(req,res)=>{
    try{
        let {id}=req.params;
        let {isactive}=req.query
        let data=req.body
        if(isactive){
            res.json(await updateStatus(id, isactive))
        }else{
            res.json(await updateUser(id, data))
        }
    }catch(error){
        res.json(error.message)
    }
})

router.delete('/:id', async(req, res)=>{
    try{
        let{id}=req.params;
        res.json(await deleteUser(id))
    }catch(error){
        res.json(error.message)
    }
})
module.exports = router;