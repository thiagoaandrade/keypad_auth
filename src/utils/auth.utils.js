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

module.exports = {
    verifyUserExists,
    hashWithSHA256
}