import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader'; // eslint-disable-line
import App from './demo';
import './css/main.scss';
const rootEl = document.getElementById('root');

(() => {
  if (DEBUG) {
    ReactDOM.render(
        (<AppContainer><App /></AppContainer>), rootEl,
    );

    if (module.hot) {
        module.hot.accept('./demo', () => {
            // If you use Webpack 2 in ES modules mode, you can
            // use <App /> here rather than require() a <NextApp />.
            const NextApp = require('./demo').default;

            ReactDOM.render(
                <AppContainer>
                    <NextApp />
                </AppContainer>,
                rootEl,
            );
        });
    }
  } else {
      ReactDOM.render(<App />, rootEl);
  }
})();

