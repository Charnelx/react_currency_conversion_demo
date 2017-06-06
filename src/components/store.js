import { createStore, combineReducers } from 'redux';

const symbols = ['AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'GBP', 'HKD', 'HRK', 'HUF', 'IDR', 'ILS',
  'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'USD', 'ZAR'];

const currencies = { list: { base: 'EUR', date: '1970-01-01', rates: {} } };

symbols.forEach((key) => {
  currencies.list.rates[key] = 1.0;
});

// The currency reducer
function currencyReducer(state = currencies, action) {
  switch (action.type) {
    case 'UPDATE_CURRENCY_LIST':
      return Object.assign({}, state, { list: action.currencies });

    default: return state;
  }
}

// The amountValueReducer
function amountValueReducer(state = { amount: '' }, action) {
  switch (action.type) {
    case 'SET_AMOUNT':
      return Object.assign({}, state, { amount: parseFloat(action.value) });

    default: return state;
  }
}

// The fromSelectReducer
function fromSelectReducer(state = { fromSelect: 'EUR' }, action) {
  switch (action.type) {
    case 'UPDATE_FROM':
      return Object.assign({}, state, { fromSelect: action.symbol });

    default: return state;
  }
}

// The toSelectReducer
function toSelectReducer(state = { toSelect: 'EUR' }, action) {
  switch (action.type) {
    case 'UPDATE_TO':
      return Object.assign({}, state, { toSelect: action.symbol });

    default: return state;
  }
}

function resultReducer(state = { result: 0.0 }, action) {
  switch (action.type) {
    case 'SET_RESULT':
      return Object.assign({}, state, { result: action.value });

    default: return state;
  }
}

// Combine Reducers
const reducers = combineReducers({
  currencyState: currencyReducer,
  amountState: amountValueReducer,
  fromSelectState: fromSelectReducer,
  toSelectState: toSelectReducer,
  resultState: resultReducer
});

const store = createStore(reducers);

export default store;
