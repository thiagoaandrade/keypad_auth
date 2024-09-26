const crypto = require('crypto')
const authModel = require('../models/auth.model')
const fs = require('fs')


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

function getCurrentDate(type){
    /*
    Values for type:
        l: Log
        a: Arquivo
    */
    const date = new Date()
    let currentDate = ""
    if(type === 'l'){
        currentDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
    }else if(type === 'a'){
        currentDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    }

    return currentDate
}

function getCurrentHour(){
    const date = new Date()
    const currentHour = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    return currentHour
}

function createLog(type, usuario){
    /*
    Values for type:
        a:  Acesso
        ta: Tentativa de acesso
        r:  Registro
    */

    let content = ''

    if(type === 'a'){
        content = `${getCurrentDate('l')} - ${getCurrentHour()} - Acesso realizado com sucesso pelo(a) ${usuario.role} ${usuario.username}\n`
    }else if(type === 'ta'){
        content = `${getCurrentDate('l')} - ${getCurrentHour()} - Tentativa de acesso com falha\n`
    }else if(type === 'r'){

    }

try {
    const data = fs.writeFileSync(`../../logs/${getCurrentDate('a')}.log`, content, {flag:'a+'})
    // arquivo escrito com sucesso
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
    verifyUserExists,
    hashWithSHA256,
    getCurrentDate,
    getCurrentHour,
    createLog,
}