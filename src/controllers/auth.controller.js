const authModel = require('../models/auth.model')
const authUtils = require('../utils/auth.utils')

async function login_post(req,res){
    const { password } = req.body

    const userExists = await authUtils.verifyUserExists(password)

    if(userExists){
        const user = await authModel.get_user(password)
        authUtils.createLog('a',user.rows[0])
        return res.status(200).json({nome: user.rows[0].username, cargo: user.rows[0].role})
    }
    authUtils.createLog('ta')
    return res.status(404).json({msg: "User does not exist"})
}

async function register_post(req,res){
    const {username, password, role} = req.body

    try {
        const userExists = await authUtils.verifyUserExists(password)

        if(userExists){
            authUtils.createLog('tr')
            return res.status(422).json({msg: "User password already exists"})
        }

        const newUser = await authModel.createUser(username, password, role)
        authUtils.createLog('r',newUser)
        return res.status(201).json({message: "User created successfully"})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    login_post,
    register_post
}