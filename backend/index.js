const express = require('express')

const cors = require('cors');
const mongoose  = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express()
const port = 4000

//ta cần phân tích cú pháp json
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})
  
app.get('/test', (req, res) => {
    res.send('test ok!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

