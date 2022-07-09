const { User } = require("../db");
const authConfig = require('../auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function recoverPassword(email){
    let userInDb = await User.findOne({where:{email}})
    if(!userInDb)throw new Error("that user does not exist");
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoibHVjYXMiLCJwaG90byI6bnVsbCwicGhvbmVfbnVtYmVyIjpudWxsLCJlbWFpbCI6Imx1Y2FzQGdtYWlsLmNvbSIsImFkbWluIjpmYWxzZSwicGFzc3dvcmQiOiIkMmIkMTAkWllTQUFOZWE3ei4zYVNVcFdNZXUwdUpWdTJXWllyR1d3ZVdxQnl1QW95TGZZRExjdW80WE8iLCJpc2FjdGl2ZSI6dHJ1ZSwiaW1hZ2UiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjItMDctMDhUMTk6MzY6NTUuMjEwWiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMDhUMjA6MjI6MDIuNTkwWiJ9LCJpYXQiOjE2NTczMTQ1OTgsImV4cCI6MTY1NzQwMDk5OH0.o0Iyof5DNUYGGLgFTFyN4YKP4jcafr2bHXKWKLDNz3I";
    jwt.verify(token, authConfig.secret, (err, decoded) => {console.log(decoded)})
    // mandar mail bonito para que recupere su contra
    return "We have sent an email to your mailbox so that you can update your password"
}

async function updatePassword(password, token){
    if(!(5 < password.length)) throw new Error("the password must have more than 5 characters");
    if(!(password.length < 256)) throw new Error("the password is too long");

    let userInDb = await User.findOne({where:{password : token}})
    if(!userInDb)throw new Error("that user does not exist");

    password = bcrypt.hashSync(password, Number.parseInt(authConfig.rounds));
    await User.update({password},{where:{id : userInDb.dataValues.id}})

    return ("the password has been updated successfully")
}

module.exports={
    recoverPassword,
    updatePassword
}