import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {BrowserRouter} from 'react-router-dom';

//Automatically makes the page go to the top on a new click.
import ScrollToTop from './main/structure/scrollToTop'

//Pulls in the array of google fonts and puts it nicely in a string to call.
import {googleFonts} from './site/siteSettings'
let fonts = googleFonts.join('|').split(' ').join('+')

ReactDOM.render(
    <BrowserRouter>
      <ScrollToTop>
          <App />
          <style>
            @import url('{`https://fonts.googleapis.com/css?family=${fonts}&display=swap`}');
          </style>
        </ScrollToTop>
    </BrowserRouter>,
document.getElementById('root'));
