const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
// const http = require('http');
const enforce = require('express-sslify')
if(process.env.NODE.ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

//Convert requests to json
app.use(bodyParser.json());

//Helps keep urls strict
app.use(bodyParser.urlencoded({extended: true}));
//Cross Origin Request (Allows to properly make requests to the backend from local 3000)

app.use(enforce.HTTPS({ trustAzureHeader: true }));

// http.createServer(app).listen(app.get('port'), function() {
//   console.log('Express server listening on port ' + app.get('port'));
// });

app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js')); 
});


app.use(cors());

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
}

app.listen(port, error => {
    if(error) throw error;
    console.log(`Server running on port ${port}`)
})



app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    }
    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if(stripeErr) {
           res.status(500).send({ error: stripeErr}) 
        }
        else {
            res.status(200).send({success: stripeRes})
        }
    })
})