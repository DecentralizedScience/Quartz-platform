var express = require('express');
var request = require('request');
var path = require('path');
var app = express();

console.log("AAAAAA")

var configFile = require('./serverConfig.json')

var access_token = configFile.access_token
var attribution_id = configFile.attribution_id

//console.log(access_token)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app
    .post('/my-server/create-order', function(req, res) {
        console.log(req.query)
          if(!req.query.amount){
            req.query.amount = 20
        }
        console.log(req.query)
        console.log(req.params)
        //if(!req.query.email){
          //req.query.email = "a@a.a"
        //}
        res.set("Content-Security-Policy", "default-src 'self'");
        request.post('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + access_token,  // TODO load from configuration file
                "PayPal-Partner-Attribution-Id": attribution_id // TODO load from configuration file
            },
            body: {
                "intent": "CAPTURE",
                "purchase_units": [{
                    "amount": {
                        "currency_code": "EUR",
                        "value": req.query.amount
                    },
                    "payee": {
                        "email_address": "seller-1@business.example.com" // req.query.email
                    },
                    "payment_instruction": {
                        "disbursement_mode": "INSTANT",
                        "platform_fees": [{
                            "amount": {
                                "currency_code": "EUR",
                                "value": (0.05 * req.query.amount).toFixed(2)
                            }
                        }]
                    }
                }],
            },
            json: true
        }, function (err, response, body) {
            //console.log(body, response)
            console.log(body)
            if (err) {
                //console.error(err);
                res.json({
                  err:err
                })
                return res.sendStatus(500);
            }
            res.json({
                id: body.id,
                //response: response
            });
        });
    });


    app
         .post('/my-server/capture-order/:id', function(req, res) {
             var OrderID = req.params.id;
             request.post('https://api-m.sandbox.paypal.com/v2/checkout/orders/' + OrderID + '/capture', {
                 headers: {
                     "Content-Type": "application/json",
                     "Authorization": "Bearer " + access_token, // TODO load from configuration file
                     "PayPal-Partner-Attribution-Id": attribution_id  // TODO load from configuration file
                 }
             }, function (err, response, body) {
               //console.log(body, response)
                 if (err) {
                     //console.error(err);
                     return res.sendStatus(500);
                 }

                 res.json({
                     status: 'success'
                 });
             });
         });


app.listen(9000);
