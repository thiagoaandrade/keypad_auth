const crypto = require('crypto')
const authModel = require('../models/auth.model')


function hashWithSHA256(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

async function verifyUserExists(hashedPassword){
    const user = await authModel.get_user(hashedPassword)

    if(user.rowCount === 0){
        return false
    }

    return true
}  

function getCurrentDate(){
    const date = new Date()
    const currentDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`

    return currentDate
}



module.exports = {
    verifyUserExists,
    hashWithSHA256,
    getCurrentDate
}