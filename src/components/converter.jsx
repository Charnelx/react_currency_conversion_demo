import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, FormControl, ControlLabel, Navbar } from 'react-bootstrap';
// import { bootstrapUtils } from 'react-bootstrap/lib/utils';

import './general.css';

// bootstrapUtils.addStyle(FormGroup, 'custom');

const defaultProps = {
  AUD:1.5173,
  BGN:1.9558,
  BRL:3.6308,
  CAD:1.5169,
  CHF:1.0893,
  CNY:7.6507,
  CZK:26.36,
  DKK:7.4392,
  GBP:0.87268,
  HKD:8.7413,
  HRK:7.4113,
  HUF:308.45,
  IDR:14931.0,
  ILS:3.9938,
  INR:72.286,
  JPY:125.02,
  KRW:1260.0,
  MXN:20.898,
  MYR:4.8014,
  NOK:9.4918,
  NZD:1.5811,
  PHP:55.553,
  PLN:4.1925,
  RON:4.5653,
  RUB:63.462,
  SEK:9.7433,
  SGD:1.5552,
  THB:38.306,
  TRY:3.9601,
  USD:1.1217,
  ZAR:14.437
};

class NavBarTop extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='#'>React J<strong>$</strong> currency conversion example</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
      </Navbar>
    );
  }
}

class CurrencyFromOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: this.props.currencies,
      selectedCurrency: 'EUR'
    };
  }

  getOptions() {
    const options = Object.keys(this.state.currencies).map((symbol) => {
      return (
        <option key={symbol} value={symbol} >
          {symbol}
        </option>
      );
    });

    return options;
  }

  render() {
    return (
      <FormControl componentClass='select' placeholder='From'>
        {this.getOptions()}
      </FormControl>
    );
  }
}

class CurrencyToOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: this.props.currencies,
      selectedCurrency: 'EUR'
    };
  }

  getOptions() {
    const options = Object.keys(this.state.currencies).map((symbol) => {
      return (
        <option key={symbol} value={symbol} >
          {symbol}
        </option>
      );
    });

    return options;
  }

  render() {
    return (
      <FormControl componentClass='select' placeholder='To'>
        {this.getOptions()}
      </FormControl>
    );
  }
}

class Converter extends Component {
  constructor(props) {
    super(props);

    this.handleCurFromChange = this.handleCurFromChange.bind(this);
    this.handleCurToChange = this.handleCurToChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);

    this.state = {
      currencies: this.props.currencies,
      curFrom: 'EUR',
      curTo: 'EUR',
      amountValue: 0
    };
  }

  handleCurFromChange(val) {
    this.setState({ curFrom: val });
  }

  handleCurToChange(val) {
    this.setState({ curTo: val });
  }

  handleAmountChange(e) {
    this.setState({ amountValue: e.target.value });
  }

  render() {
    return (
      <div>
        <div className='navigation'>
          <NavBarTop/>
        </div>
        <div className='container form-control-col-centered'>
          <div className='row'>
            <FormGroup controlId='curSelectFrom' className='col-sm-6'>
              <ControlLabel>From</ControlLabel>
              <CurrencyFromOptions currencies={this.props.currencies}/>
            </FormGroup>
            <FormGroup controlId='curSelectTo' className='col-sm-6'>
              <ControlLabel>To</ControlLabel>
              <CurrencyToOptions currencies={this.props.currencies}/>
            </FormGroup>
          </div>
          <FormGroup controlId='amount' bsSize='small'>
            <ControlLabel>Amount:</ControlLabel>
            <FormControl
              type='text'
              value={this.state.amountValue}
              placeholder='Enter amount'
              onChange={this.handleAmountChange}
              bsSize='small'
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId='conversionResult'>
            <ControlLabel>Result</ControlLabel>
            <FormControl componentClass='textarea' placeholder='0' />
          </FormGroup>
          <Button bsStyle='primary'>Run</Button>
        </div>
      </div>
    );
  }
}

Converter.defaultProps = { currencies: defaultProps };

CurrencyFromOptions.propTypes = {
  currencies: PropTypes.object
};

CurrencyToOptions.propTypes = {
  currencies: PropTypes.object
};

Converter.propTypes = {
  currencies: PropTypes.object
};

export default Converter;
