import React, { Component } from 'react';

var defaultProps = {
    "AUD":1.5173,
    "BGN":1.9558,
    "BRL":3.6308,
    "CAD":1.5169,
    "CHF":1.0893,
    "CNY":7.6507,
    "CZK":26.36,
    "DKK":7.4392,
    "GBP":0.87268,
    "HKD":8.7413,
    "HRK":7.4113,
    "HUF":308.45,
    "IDR":14931.0,
    "ILS":3.9938,
    "INR":72.286,
    "JPY":125.02,
    "KRW":1260.0,
    "MXN":20.898,
    "MYR":4.8014,
    "NOK":9.4918,
    "NZD":1.5811,
    "PHP":55.553,
    "PLN":4.1925,
    "RON":4.5653,
    "RUB":63.462,
    "SEK":9.7433,
    "SGD":1.5552,
    "THB":38.306,
    "TRY":3.9601,
    "USD":1.1217,
    "ZAR":14.437
};

class Converter extends Component {
  constructor(props) {
    super(props);

    this.handleCurFromChange = this.handleCurFromChange.bind(this);
    this.handleCurToChange = this.handleCurToChange.bind(this);

    this.state = {
      currencies: this.props,
      curFrom: 'EUR',
      curTo: 'EUR'
    };
  }

  handleCurFromChange(val){
    this.setState({ curFrom: val})
  }

  handleCurToChange(val){
    this.setState({ curTo: val })
  }

  render(){
    return (
      <div className="container">
        <h1>Hello, world!</h1>
      </div>
    )
  }
}

Converter.defaultProps = defaultProps;

export default Converter;
