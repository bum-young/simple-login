import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store, configureFakeBackend } from './_helpers';
import { App } from './App';

configureFakeBackend();

render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));


