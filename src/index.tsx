import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import './index.css';
import App from './App';


const theme = createMuiTheme({
  spacing: 8
});


ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);
