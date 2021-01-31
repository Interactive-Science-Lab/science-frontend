import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';

//Currently semantic UI is pretty much JUST taking care of scrollbars
import 'semantic-ui-css/semantic.min.css'

import App from './App';
import { BrowserRouter } from 'react-router-dom';

//Automatically makes the page go to the top on a new click.
import ScrollToTop from './structure/scrollToTop'

import ReactGA from 'react-ga';

//Pulls in the array of google fonts and puts it nicely in a string to call.
import { googleFonts, siteOptions, demoGoogleId, liveGoogleId } from './site/siteSettings'
let fonts = googleFonts.join('|').split(' ').join('+')
let googleId = siteOptions.demoSite ? demoGoogleId : liveGoogleId

ReactGA.initialize(googleId);
ReactGA.pageview(window.location.pathname + window.location.search);

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
