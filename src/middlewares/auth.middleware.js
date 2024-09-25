const crypto = require('crypto')

function hashPasswordWithSHA256(req,res,next){
    let { password } = req.body
    password = password.toString()

    try {
        password = crypto.createHash('sha256').update(password).digest('hex')
        req.body.password = password
    
        next()
    } catch (error) {
        console.log(error)   
    }

}

module.exports = {
    hashPasswordWithSHA256
}