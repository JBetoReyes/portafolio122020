import React from 'react';
import { hydrate } from 'react-dom';
import Home from '../shared/pages/Home';

hydrate(
  <Home />,
  document.getElementById('app')
);

