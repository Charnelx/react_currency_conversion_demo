import React      from 'react';
import ReactDOM   from 'react-dom';
import Converter  from 'components/converter.jsx';
import store      from 'components/store.js';
import { Provider } from 'react-redux';

ReactDOM.render(<Provider store={store}><Converter /></Provider>, document.getElementById('root'));
