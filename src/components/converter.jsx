// Import default member, {member} from the module react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, FormGroup, FormControl, ControlLabel, Navbar } from 'react-bootstrap';
import store from './store';
import CurrencyFromOptions from './convertor_cmp/cur_form_opt';
import CurrencyToOptions from './convertor_cmp/cur_to_opt';

import './general.css';

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

class Converter extends Component {

  constructor(props) {
    super(props);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleRunBtn = this.handleRunBtn.bind(this);
  }

  componentDidMount() {
    axios.get('http://api.fixer.io/latest').then(response => {
      store.dispatch({
        type: 'UPDATE_CURRENCY_LIST',
        currencies: response.data
      });
    });
  }

  handleAmountChange(e) {
    store.dispatch({
      type: 'SET_AMOUNT',
      value: e.target.value
    });
  }

  handleRunBtn(e) {
    axios.get('http://api.fixer.io/latest', {
      params: {
        base: this.props.symbolFrom,
        symbols: this.props.symbolTo
      }
    }).then(response => {
      const rate = response.data.rates[this.props.symbolTo];
      let result = ((rate * (this.props.amount)).toFixed(2));

      if (isNaN(result)) {
        alert('Forgot to set amount?');
        result = 0;
      }

      store.dispatch({
        type: 'SET_RESULT',
        value: result
      });
    });
    e.preventDefault();
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
              <ControlLabel>From:</ControlLabel>
              <CurrencyFromOptions />
            </FormGroup>
            <FormGroup controlId='curSelectTo' className='col-sm-6'>
              <ControlLabel>To</ControlLabel>
              <CurrencyToOptions/>
            </FormGroup>
          </div>
          <FormGroup controlId='amount' bsSize='small'>
            <ControlLabel>Amount:</ControlLabel>
            <FormControl
              type='text'
              value={this.props.amount}
              placeholder='Enter amount'
              onChange={this.handleAmountChange}
              bsSize='small'
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId='conversionResult'>
            <ControlLabel>Result:</ControlLabel>
            <FormControl
              componentClass='textarea'
              placeholder='0'
              value={this.props.result}
            />
          </FormGroup>
          <Button bsStyle='primary' onClick={this.handleRunBtn}>Run</Button>
        </div>
      </div>
    );
  }
}

Converter.propType = {
  currencies: PropTypes.object,
  symbolFrom: PropTypes.string,
  symbolTo:   PropTypes.string,
  amount:     PropTypes.string,
  result:     PropTypes.object
};


function mapStateToProps(storage) {
  return {
    currencies: storage.currencyState.list,
    symbolFrom: storage.fromSelectState.fromSelect,
    symbolTo:   storage.toSelectState.toSelect,
    amount:     storage.amountState.amount,
    result:     storage.resultState.result
  };
}

export default connect(mapStateToProps)(Converter);
