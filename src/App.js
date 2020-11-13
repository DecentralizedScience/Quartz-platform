import { loadScript } from '@paypal/paypal-js'

import logo from './logo.svg';
import './App.css';

function App() {
  loadScript({ 'client-id': 'XXXXX'}) // TODO load from configuration file
    .then(paypal => {
      paypal.Buttons({
          createOrder: function (data, actions) {
            return fetch('http://localhost:9000/my-server/create-order', {
              method: 'POST'
            }).then(function(res) {
              return res.json();
            }).then(function(data) {
              return data.id;
            });
          },
          onApprove: function (data, actions) {
            return fetch('http://localhost:9000/my-server/capture-order/' + data.orderID, {
              method: 'POST'
            }).then(function(res) {
              if (!res.ok) {
                alert('Something went wrong');
              }
            });
          }
        }).render('#paypal-button-container')})

  return (
    <div className="App">
      <div id="paypal-button-container"></div>
    </div>
  );
}

export default App;
