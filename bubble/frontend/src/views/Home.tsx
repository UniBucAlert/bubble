import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { isAuthenticated } from '../utils/auth';

const useStyles = makeStyles(() => ({
  link: {
    color: '#61dafb',
  },
}));

export const Home: FC = () => {
  const [message] = useState<string>('');
  const [error] = useState<string>('');
  const classes = useStyles();

  return (
    <>
      {message && (
        <p>
          <code>{message}</code>
        </p>
      )}
      {error && (
        <p>
          Error: <code>{error}</code>
        </p>
      )}
      <a className={classes.link} href="/admin">
        Admin Dashboard
      </a>
      {isAuthenticated() ? (
        <a className={classes.link} href="/logout">
          Logout
        </a>
      ) : (
        <>
          <a className={classes.link} href="/login">
            Login
          </a>
          <a className={classes.link} href="/signup">
            Sign Up
          </a>
        </>
      )}
    </>
  );
};
