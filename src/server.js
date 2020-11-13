var express = require('express');
var request = require('request');
var path = require('path');
var app = express();

console.log("AAAAAA")

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app
    .post('/my-server/create-order', function(req, res) {
        console.log(req)
        //if(!req.query.amount){
        //  req.query.amount = 20
        //}
        //if(!req.query.email){
        //  req.query.email = "a@a.a"
        //}
        res.set("Content-Security-Policy", "default-src 'self'");
        request.post('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer XXXXX",  // TODO load from configuration file
                "PayPal-Partner-Attribution-Id": "XXXX" // TODO load from configuration file
            },
            body: {
                "intent": "CAPTURE",
                "purchase_units": [{
                    "amount": {
                        "currency_code": "USD",
                        "value": 20 //req.query.amount
                    },
                    "payee": {
                        "email_address": "seller-1@business.example.com" //req.query.email
                    },
                    "payment_instruction": {
                        "disbursement_mode": "INSTANT",
                        "platform_fees": [{
                            "amount": {
                                "currency_code": "USD",
                                "value": 0.05*20//req.query.amount
                            }
                        }]
                    }
                }],
            },
            json: true
        }, function (err, response, body) {
            console.log(body, response)
            if (err) {
                console.error(err);
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
                     "Authorization": "Bearer XXXXX", // TODO load from configuration file
                     "PayPal-Partner-Attribution-Id": "XXXX"  // TODO load from configuration file
                 }
             }, function (err, response, body) {
               console.log(body, response)
                 if (err) {
                     console.error(err);
                     return res.sendStatus(500);
                 }

                 res.json({
                     status: 'success'
                 });
             });
         });


app.listen(9000);
