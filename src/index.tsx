import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { appStore } from "./redux";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import './index.css';
import App from './App';


const theme = createMuiTheme({
  spacing: 8
});

ReactDOM.render(
  <Provider store={appStore}>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
