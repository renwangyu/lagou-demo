import React from "react";
import { hydrate, render } from "react-dom";
import App from '../shared/App';

console.log(App);

hydrate(
  <App />,
  document.getElementById('root')
);