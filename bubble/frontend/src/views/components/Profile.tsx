import React, { FC, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { AccountCircle, Face, Fingerprint } from '@material-ui/icons';

import { getUser } from '../../utils/users';

interface UserType {
  email: string;
  first_name: string;
  last_name: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

export default function Profile() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState<UserType | null>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getUser().then((data) => {
      console.log('Success:', data);
      setUser(data);
    });
  }, []);

  if (!user) {
    return <div></div>;
  }

  return (
    <div>
      <div onClick={handleOpen}>Profile</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Profile</h2>
            <p id="transition-modal-description">
              <Grid container spacing={3} alignItems="center">
                <Grid item>
                  <Face />
                </Grid>
                <Grid item md={true} sm={true} xs={true}>
                  {user.email}
                </Grid>
              </Grid>
              <Grid container spacing={3} alignItems="center">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item md={true} sm={true} xs={true}>
                  {user.first_name}
                </Grid>
              </Grid>
              <Grid container spacing={3} alignItems="center">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item md={true} sm={true} xs={true}>
                  {user.last_name}
                </Grid>
              </Grid>
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
