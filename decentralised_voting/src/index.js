import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import Options from "./drizzleOptions.js"
import { DrizzleProvider } from 'drizzle-react';
import {LoadingContainer} from 'drizzle-react-components'


ReactDOM.render(
  <DrizzleProvider options={Options}>
  <LoadingContainer>
    <Home />
  </LoadingContainer>
  </DrizzleProvider>,document.getElementById('root')
)
