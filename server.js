const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

if(process.env.NODE.ENV !== 'production') require('dotnev').config();

const app = expres();
const port = process.env.PORT || 5000;

//Convert requests to json
app.use(bodyParser.json());
//Helps keep urls strict
app.use(bodyParser.urlencoded({extended: true}));

//Cross Origin Request (Allows to prperly make requests to abcnk end from local 3000)
app.use(cors());

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));


    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
}

app.listen(port, error => {
    if(error) throw error;
    console.log('Server running on port' + port)
})