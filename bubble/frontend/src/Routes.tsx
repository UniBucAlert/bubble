import * as dotenv from 'dotenv';
import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';

import { Login, SignUp, PrivateRoute } from './views';
import { Admin } from './admin';
import { logout } from './utils/auth';
import { createChat, sendMessage } from "./firebase/chatting";
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

const useStyles = makeStyles((theme) => ({
  // Styling global custom
  app: {},
}));

export const Routes: FC = () => {
  const classes = useStyles();
  const history = useHistory();

  // createChat(2, 1).then(chatId => {
  //   console.log(chatId);
  //   // sendMessage(chatId, 1, "salut")
  //   //   .then((ret) => ret ? console.log('sent') : console.log('blah'));
  // });

  return (
    <Switch>
      <Route path="/admin">
        <Admin />
      </Route>

      <ThemeProvider theme={theme}>
        <div className={classes.app}>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route
            path="/logout"
            render={() => {
              logout();
              history.push('/');
              return null;
            }}
          />
          <PrivateRoute path="/" component={ChatView} />

          {/* in home e ecranul default din fastapi, TODO: sterge-l */}
          {/* <Route exact path="/" component={Home} />  */}
        </div>
      </ThemeProvider>
    </Switch>
  );
};
