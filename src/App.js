import { loadScript } from '@paypal/paypal-js'
import React, { Component } from 'react'

import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props)
    this.state={
      amount: this.props.amount,
      onSuccess: this.props.onSuccess || (succ => {console.log(succ)}),
      onError: this.props.onError || (err => {console.error(err)}),
      onWait: this.props.onWait,
      paypalCallPromise: this.props.paypalCallPromise
    }
    var amount = this.state.amount

    var onSuccess = this.state.onSuccess
    var onError = this.state.onError
    var onWait = this.state.onWait
    var paypalCallPromise = this.state.paypalCallPromise

    var configFile = require('./serverConfig.json')
    var client_id = configFile.client_id


    loadScript({ 'client-id': client_id, 'currency': 'EUR'}) // TODO load from configuration file
    .then(paypal => {
      window.btns = paypal.Buttons({
        createOrder: function (data, actions) {
          console.log(data, actions);
          return fetch('http://localhost:9000/my-server/create-order?amount='+amount, {
            method: 'POST'
          }).then(function(res) {
            // TODO: capture possible errors at this call
            console.log(res);
            return res.json();
          }).then(function(data) {
            console.log(data);
            return data.id;
          });
        },
        onApprove: function (data, actions) {
          onWait();
          console.log(data, actions);
          return fetch('http://localhost:9000/my-server/capture-order/' + data.orderID, {
            method: 'POST'
          }).then(function(res) {
            if (!res.ok) {
              alert('Something went wrong');
              onError();
            } else {
              onSuccess();
            }
          });
        },
        onError: onError
      })
        window.btns.render('#paypal-button-container')

    })
  }

  render(){

    return (
      <div className="App">
        <div id="paypal-button-container"></div>
      </div>
    );
  }
}

export default App;
