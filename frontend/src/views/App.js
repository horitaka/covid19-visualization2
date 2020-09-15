import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import amber from '@material-ui/core/colors/amber';
// import deepOrange from '@material-ui/core/colors/deepOrange';
import 'typeface-roboto';

import TwoPaneLayout from './layouts/TwoPaneLayout'
import Map from './map/Map'
import Settings from './settings/Settings'
import LinkPage from './linklist/LinkPage'
import Admin from './admin/Admin'
import AppInitialize from './initialization/AppInitialize'

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#FF9800',
      // dark: will be calculated from palette.primary.main,
      contrastText: '#fafafa'
    },
    secondary: {
      // light: will be calculated from palette.primary.main,
      main: '#29B6F6',
      // dark: will be calculated from palette.secondary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/links">
            <LinkPage />
          </Route>
          <Route path="/">
            <TwoPaneLayout
              leftComponent={<Map />}
              rightComponent={<Settings />}
            />
          </Route>
        </Switch>
      </Router>
      <AppInitialize />
    </ThemeProvider>
  );
}

export default App;
