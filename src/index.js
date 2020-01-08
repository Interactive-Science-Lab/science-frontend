import React from 'react';
import ReactDOM from 'react-dom';

import 'semantic-ui-css/semantic.min.css'

import App from './App';
import ScrollToTop from './pageComponents/scrollToTop'
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(

    <BrowserRouter>
      <ScrollToTop>
          <App />
          <style>
            @import url('https://fonts.googleapis.com/css?family=Raleway|Open+Sans|Ma+Shan+Zheng&display=swap');
          </style>
        </ScrollToTop>
    </BrowserRouter>,

document.getElementById('root'));
