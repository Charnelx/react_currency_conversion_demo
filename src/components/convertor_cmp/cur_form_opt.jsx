import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import store from '../store';

class CurrencyFromOptions extends Component {

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  handleSelect(e) {
    store.dispatch({
      type: 'UPDATE_FROM',
      symbol: e.target.value
    });
  }

  getOptions() {
    const options = Object.keys(this.props.symbols).map((symbol) => {
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
      <FormControl componentClass='select' placeholder='From' onChange={this.handleSelect}>
        {this.getOptions()}
      </FormControl>
    );
  }
}

CurrencyFromOptions.propTypes = {
  symbols: PropTypes.object,
  symbol: PropTypes.string
};

function mapStateToProps(storage) {
  return {
    symbols: storage.currencyState.list.rates,
    symbol: storage.fromSelectState.fromSelect
  };
}

export default connect(mapStateToProps)(CurrencyFromOptions);
