import * as dotenv from 'dotenv';
import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router';

import { Login, SignUp, PrivateRoute } from './views';
import { Admin } from './admin';
import { logout } from './utils/auth';
import { ChatView } from './views/ChatView';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import teal from '@material-ui/core/colors/teal';


// Import env variables
dotenv.config();

// Theming componente Material UI
// https://material-ui.com/customization/theming/
const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: pink['A400'],
    },
    type: 'light',
  },
});

export const Routes: FC = () => {
  const history = useHistory();

  return (
    <Switch>
      <Route path="/admin">
        <Admin />
      </Route>

      <ThemeProvider theme={theme}>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route
          path="/logout"
          render={() => {
            logout();
            console.log("bop")
            history.push("/")
            return null;
          }}
        />
        <PrivateRoute  path="/" component={ChatView} /> 
      </ThemeProvider>
    </Switch>

  );
};
