[![License: AGPL v3](https://img.shields.io/github/license/DecentralizedScience/Prototype?color=blue)](http://www.gnu.org/licenses/agpl-3.0)

# Quartz-platform
Quartz platform using PayPal for marketplaces and platforms.

## Community
* join our [community forum](https://discuss.decentralized.science/)
* connect at our [developers' chat](https://dec-sci.zulipchat.com/#narrow/stream/238971-development)

## Requisites
To run and install this application you need:

* [node](https://nodejs.org) and [npm](https://www.npmjs.com/)
* A [PayPal account](https://www.paypal.com/webapps/mpp/account-selection)
* A wallet able to receive Interledger payments. Such as:
  * A [Quartz account](https://quartz.to/). Now we can only create accounts manually. Stay tuned for when Quartz registrations open.
  * An account in some service like [Uphold](https://uphold.com/es)

## How to run this prototype
First, clone the repo. Then, to install, run:
```
npm install
```

### Setup
There are three ways of configuring this app, as we describe bellow. Each of them has more priority than the following. For instance, using the properties of the react component would override the QuartzSettings data element and the configuration file options.

#### Using properties of the react component
The App component receives `PayPal_email` and `ILP_wallet` as properties. Thus, you can configure the app by specifying them in your html as:

```
<App PayPal_email="email@example.com" ILP_wallet="ILPAdrress">
```

#### Using QuartzSettings data element.
The app will alse read the data of an HTML data element with id "QuartzOASettings" and the following data parameters:

```
<data id="QuartzOASettings"
  data-paypal_email="email@example.com"
  data-ilp_wallet="ILPAdrress">
</data>
```


#### Using the configuration file

Enter `src/components` and copy `config.json.example` in `config.json` and set the email associated to the PayPal account in `PayPal_email` and the wallet that can receive Interledger payments in `ILP_wallet`.

```
cp src/components/config.json.example src/components/config.json
```

You must set your accounts in the copied document. Make sure the PayPal account can receive donations and the ILP account can receive payments.

Once everything is set up, the application can be run.


### Run the web app
To run the web app, run:
```
npm start
```

A browser window should then open, with our web app working and connected to PayPal and Interledger.
