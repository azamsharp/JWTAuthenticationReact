const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const authenticate = require('./middlewares/authMiddleware')

const app = express()
const PORT = 8080

global.users = [
    { username: 'johndoe', password: 'password' },
    { username: 'marydoe', password: 'password' }
]

const accounts = [
    { accountType: 'checking', balance: 5000, username: 'johndoe' },
    { accountType: 'savings', balance: 15000, username: 'johndoe' },
    { accountType: 'checking', balance: 3000, username: 'marydoe' },
]

app.use(cors())
app.use(express.json())

app.post('/login', (req, res) => {

    const username = req.body.username
    const password = req.body.password

    const user = users.find((user) => user.username == username && user.password == password)
    if (user) {
        // generate the json web token 
        const token = jwt.sign({ username: user.username }, 'SECRETKEY')
        res.json({ success: true, token: token })
    } else {
        // response with not authenticated 
        res.json({ success: false, message: 'Not authenticated' })
    }

})

app.post('/deposit', authenticate,(req, res) => {

})

app.get('/profile/:username', authenticate, (req, res) => {
    
})

app.get('/accounts/:username', authenticate, (req, res) => {

    const username = req.params.username 
    const userAccounts = accounts.filter((account) => account.username == username)
    res.json(userAccounts)
    
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})