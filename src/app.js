require('dotenv').config()
const express = require('express')
const authRouter = require('./routes/auth.route')

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(authRouter)

app.get('/', (req,res) => {
    res.send('<h1>Home Page</h1>')
    res.status(200).json({teste:true})
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})