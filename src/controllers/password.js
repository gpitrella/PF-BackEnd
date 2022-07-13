const { User } = require("../db");
const authConfig = require('../auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const API_KEY = process.env.SENDGRID_API_KEY
const { CLIENT_URL } = process.env;

sgMail.setApiKey(API_KEY)

async function recoverPassword(email){
    let userInDb = await User.findOne({where:{email}})
    if(!userInDb)throw new Error("that user does not exist");

    let token = jwt.sign({ user: userInDb }, authConfig.secret, {expiresIn: authConfig.expires});
   
    try{
        const msg={
          to: email,
          from: "techmarketpf@gmail.com",
          subject:"Recover Password",
          text:"This email was requested to change your password, please do not share with anyone, if you have not requested it, you do not need to do anything",
          html:`<a href=${CLIENT_URL}/updatepassword/?token=${token}>Restore your password</a>`
        }
        await sgMail.send(msg);
        }catch(error){
          console.log(error)
      }



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