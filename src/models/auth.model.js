const connection = require('./connection')

async function createUser(username, password, role){
    const query = "INSERT INTO users( username, password, role ) VALUES( $1, $2, $3 ) RETURNING *"
    const values = [username, password, role]

    const newUser = await connection.query(query, values)
    return newUser.rows[0]
}

async function get_user(sha256hash){
    const query = "SELECT * FROM users WHERE password = $1"
    const values = [sha256hash]

    const user = await connection.query(query, values)
    return user
}

module.exports = {
    createUser,
    get_user
}