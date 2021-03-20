import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import './index.css';
import App from './App';


const theme = createMuiTheme({
  spacing: 8
});

const store = createStore(rootReducer);

export type AppState = ReturnType<typeof rootReducer>;

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
