import { loadScript } from '@paypal/paypal-js'
import React, { Component } from 'react'
import DonationButton from './components/DonationButton'

import logo from './logo.svg';
import './App.css';

class App extends Component {

  render(){
    return(
      <DonationButton/>
    )
  }
}

export default App;
