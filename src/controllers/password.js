const { User } = require("../db");
const authConfig = require('../auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function recoverPassword(email){
    let userInDb = await User.findOne({where:{email}})
    if(!userInDb)throw new Error("that user does not exist");

    let token = jwt.sign({ user: userInDb }, authConfig.secret, {expiresIn: authConfig.expires});
    console.log(token)

    // mandar mail bonito para que recupere su contra
    return "We have sent an email to your mailbox so that you can update your password"
}

async function updatePassword(password, token){
    if(!(5 < password.length)) throw new Error("the password must have more than 5 characters");
    if(!(password.length < 256)) throw new Error("the password is too long");

    let userInDb;

    jwt.verify(token, authConfig.secret, (error, decoded) => {
        if(error) throw new Error('That user does not exist')
        userInDb = decoded.user
    })

    password = bcrypt.hashSync(password, Number.parseInt(authConfig.rounds));
    await User.update({password},{where:{id : userInDb.id}})

    return ("the password has been updated successfully")
}

module.exports={
    recoverPassword,
    updatePassword
}