const { User } = require("../db");

async function getUsers(){
    let user = await User.findAll({include:[
        { association: 'useraddresses', through:{attributes: []}},
        { association: 'comments', through:{attributes: []}}
    ]})
    if(!user.length) throw new Error("There are no users")
    return user
}

async function getUsersFull(){
    let user = await User.findAll({include:[
        { association: 'useraddresses', through:{attributes: []}},
        { association: 'comments', through:{attributes: []}},
        { association: 'favorites', through:{attributes: []}},
        { association: 'reviews', through:{attributes: []}},
    ]})
    if(!user.length) throw new Error("There are no users")
    return user
}

async function getUserByid(id){
    let userId = await User.findByPk(id, {include:[
        { association: 'useraddresses', through:{attributes: []}},
        { association: 'comments', through:{attributes: []}},
        { association: 'favorites', through:{attributes: []}},
        { association: 'reviews', through:{attributes: []}},
]})
    return userId
}

async function createUser({name,email,admin,password,phone_number,photo}){
    let findInDb = await User.findOne({where:{email:email}}) 
    if(findInDb) throw new Error('There is already a user with this email.User already exist')

    await User.create({name,email,admin,password})
    return 'user created successfully'
}

async function updateUser(id,{name,email,admin,password,phone_number,photo,image}){
        await User.update({name,email,admin,password,phone_number,photo,image},{where:{id:id}})
        return 'user update successfully'
}

async function updateStatus(id,isactive){
    await User.update({isactive},{where:{id:id}})
    return 'status update successfully'
}

async function changeRole(id,admin){
        await User.update({admin:admin},{where:{id:id}})
    return 'Role update successfully'
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
    getUserByid,
    changeRole
}