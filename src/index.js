import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Signin from './pages/signin/Signin'
import Panel from './pages/dashboard/Panel'
import Signup from './pages/signup/Signup'
import reportWebVitals from './reportWebVitals';
import '@shopify/polaris/dist/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider } from '@shopify/polaris';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

ReactDOM.render(
  <AppProvider i18n={enTranslations}>
    <Router>
      <Switch>
        <Route exact path="/">
          <Signin></Signin>
        </Route>
        <Route path="/admin">
          <Panel></Panel>
        </Route>
        <Route path="/signup">
          <Signup></Signup>
        </Route>
      </Switch>
    </Router>
  </AppProvider>,
  document.querySelector('#root'),
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
