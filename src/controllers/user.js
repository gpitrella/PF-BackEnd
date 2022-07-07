const {User, Useraddress, Comments, Favorites, Review} = require("../db");

async function getUsers(){
    let user = await User.findAll({
        include:[{
            model: Useraddress,
            through: {
            attributes: [],
            },
        },
        {
            model: Comments,
            through: {
              attributes: [],
            },
        },
        
    ]})
    if(user.length){
        return user
    }else{
        throw new Error("There are no users")
    }
}

async function getUsersFull(){
    let user = await User.findAll({
        include:[{
            model: Useraddress,
            through: {
            attributes: [],
            },
        },
        {
            model: Comments,
            through: {
              attributes: [],
            },
        },
        {
            model: Favorites,
            through: {
              attributes: [],
            },
        },
        {
            model: Review,
            through: {
              attributes: [],
            },
        }
    ]})
    if(user.length){
        return user
    }else{
        throw new Error("There are no users")
    }
}

async function getUserByid(id){
    let userId = await User.findByPk(id, {include:[
    {
        model: Useraddress,
        through: {
        attributes: [],
        },
    },
    {
        model: Comments,
        through: {
          attributes: [],
        },
    },
    {
        model: Favorites,
        through: {
          attributes: [],
        },
    },
    {
        model: Review,
        through: {
          attributes: [],
        },
    }
]})
    return userId
}

async function createUser({name,email,admin,password,phone_number,photo}){
    let findInDb = await User.findOne({where:{email:email}}) 
    if(!findInDb) {
        await User.create({name,email,admin,password})
        return 'user created successfully'
    }else{
        throw new Error('There is already a user with this email.User already exist')
    }
}

async function updateUser(id,{name,email,admin,password,phone_number,photo}){
        await User.update({name,email,admin,password},{where:{id:id}})
        return 'user update successfully'
}

async function updateStatus(id,isactive){
    await User.update({isactive},{where:{id:id}})
    return 'status update successfully'
}

async function deleteUser(id){
    await User.destroy({where:{id:id}})
    return 'User was remove'
}

//push
module.exports={
    getUsersFull,
    getUsers,
    createUser,
    updateUser,
    updateStatus,
    deleteUser,
    getUserByid
}