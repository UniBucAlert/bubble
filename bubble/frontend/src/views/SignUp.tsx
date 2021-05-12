import React, { FC, useState } from 'react';
import { Paper, Grid, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Face, Fingerprint } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import logo from '../assets/logo-text-inline.png';

import { signUp, isAuthenticated } from '../utils/auth';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(1),
  },
  button: {
    textTransform: 'none',
  },
  marginTop: {
    marginTop: 10,
  },
  container: {
    background:
      'linear-gradient(30deg, rgba(0,23,36,1) 0%, rgba(0,232,220,1) 94%)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },
  logo: {
    paddingTop: 20,
    paddingBottom: 20,
    width: '100%',
  },
}));

export const SignUp: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (_: React.MouseEvent) => {
    // Password confirmation validation
    if (password !== passwordConfirmation) setError('Passwords do not match');
    else {
      setError('');
      try {
        const data = await signUp(email, password, passwordConfirmation);

        if (data) {
          history.push('/');
        }
      } catch (err) {
        if (err instanceof Error) {
          // handle errors thrown from frontend
          setError(err.message);
        } else {
          // handle errors thrown from backend
          setError(err);
        }
      }
    }
  };

  return isAuthenticated() ? (
    <Redirect to="/" />
  ) : (
    <div className={classes.container}>
      <Paper className={classes.padding}>
        <div className={classes.margin}>
          <img className={classes.logo} src={logo} alt="logo"></img>

          <Grid container spacing={3} alignItems="flex-end">
            <Grid item>
              <Face />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                fullWidth
                autoFocus
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item>
              <Fingerprint />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item>
              <Fingerprint />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="passwordConfirmation"
                label="Confirm password"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.currentTarget.value)}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <br />
          <Grid container alignItems="center">
            {error && (
              <Grid item>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
          </Grid>
          <Grid container justify="center" className={classes.marginTop}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </Grid>
        </div>
      </Paper>
    </div>
  );
};
