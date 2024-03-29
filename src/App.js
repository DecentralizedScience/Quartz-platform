import { loadScript } from '@paypal/paypal-js'
import React, { Component } from 'react'
import DonationButton from './components/DonationButton'

import logo from './logo.svg';
import './App.css';

class App extends Component {

  render(){
    var ILP_wallet, PayPal_email
    console.log(this.props);
    if (this.props.ILP_wallet) {
      ILP_wallet = this.props.ILP_wallet
    } else {
      console.log('no ILP Wallet in props')
      var settings = document.getElementById('QuartzOASettings')
      if (settings && settings.dataset.ilp_wallet) {
        ILP_wallet = settings.dataset.ilp_wallet
      } else {
        console.log('no ILP Wallet in settings')
        var config = require('./components/config.json')
        ILP_wallet = config.ILP_wallet
      }
    }

    if (this.props.PayPal_email) {
      PayPal_email = this.props.PayPal_email
    } else {
      console.log('no PayPal_email in props')
      var settings = document.getElementById('QuartzOASettings')
      if (settings && settings.dataset.paypal_email) {
        PayPal_email = settings.dataset.paypal_email
      } else {
        console.log('no PayPal_email in settings')
        var config = require('./components/config.json')
        PayPal_email = config.PayPal_email
      }
    }

    return(
      <DonationButton ILP_wallet={ILP_wallet} PayPal_email={PayPal_email}/>
    )
  }
}

export default App;
