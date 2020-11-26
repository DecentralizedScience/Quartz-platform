[![License: AGPL v3](https://img.shields.io/github/license/DecentralizedScience/Prototype?color=blue)](http://www.gnu.org/licenses/agpl-3.0)

# Quartz-platform
Quartz platform using PayPal for marketplaces and platforms

## Community
* join our [community forum](https://discuss.decentralized.science/)
* connect at our [developers' chat](https://dec-sci.zulipchat.com/#narrow/stream/238971-development)

## Requisites
To run and install this application you need:

* [node](https://nodejs.org) and [npm](https://www.npmjs.com/)
* A [PayPal developer account](https://developer.paypal.com/home)

## How to run this prototype
First, clone the repo. Then, to install, run:
```
npm install
```

### Setup
In the [PayPal developer's dashboard](https://developer.paypal.com/developer/applications) create a business sandbox account and a REST API app linked to said account. This app will have a certain `client-id` and a `secret`. Use those to generate an access token:
```
curl -v https://api-m.sandbox.paypal.com/v1/oauth2/token \
   -H "Accept: application/json" \
   -H "Accept-Language: en_US" \
   -u "<client-id>:<secret>" \
   -d "grant_type=client_credentials"
```

You also need a `Paypal-Partner-Attribution-Id`, that can be obtained by contacting the PayPal support team.

After that, copy `serverConfig.json.example` in `serverConfig.json` and set the `Attribution-Id`, the `access-token` and the `client-id`.

Once everything is set up, the application can be run.

### Run server
To run the server, open the src directory and run `nodemon`:
```
cd src
nodemon srver.js
```

### Run the web app
To run the web app, run:
```
npm start
```

A browser window should then open, with our web app working and connected to PayPal.
