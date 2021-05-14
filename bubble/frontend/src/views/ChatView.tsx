import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { MenuProps } from '@material-ui/core/Menu/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router';
import Grid from '@material-ui/core/Grid';

import logo from '../assets/logo-text-inline.png';

import { getUser } from '../utils/users';
import FriendsList from './components/FriendsList';
import Profile from './components/Profile';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: '100vh',
    backgroundColor: 'blue',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    width: '100px',
    marginTop: '2px',
    marginBottom: '2px',
  },
  separator: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: '#333333',
  },
}));

interface FriendsListType {
  friends: { firstName: string; lastName: string; status: string }[];
}

export const ChatView: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [friends, setFriends] = React.useState([
    { firstName: 'John', lastName: 'Smith', status: 'active' },
    { firstName: 'Michael', lastName: 'Jordan', status: 'inactive' },
    { firstName: 'Michael', lastName: 'Jordan', status: 'inactive' },
    { firstName: 'Michael', lastName: 'Jordan', status: 'inactive' },
    { firstName: 'Michael', lastName: 'Jordan', status: 'inactive' },
    { firstName: 'Michael', lastName: 'Jordan', status: 'inactive' },
    { firstName: 'Michael', lastName: 'Jordan', status: 'inactive' },
    { firstName: 'Michael', lastName: 'Jordan', status: 'inactive' },
    { firstName: 'Michael', lastName: 'Jordan', status: 'inactive' },
    { firstName: 'Michael', lastName: 'Jordan', status: 'inactive' },
    { firstName: 'Michael', lastName: 'Jordan', status: 'inactive' },
    { firstName: 'Michael', lastName: 'Jordan', status: 'inactive' },
    { firstName: 'Michael', lastName: 'Jordan', status: 'inactive' },
    { firstName: 'Michael', lastName: 'Jordan', status: 'inactive' },
    { firstName: 'Michael', lastName: 'Jordan', status: 'inactive' },
    { firstName: 'Michael', lastName: 'Jordan', status: 'inactive' },
    { firstName: 'Michael', lastName: 'Jordan', status: 'inactive' },
    { firstName: 'Michael', lastName: 'Jordan', status: 'inactive' },
    { firstName: 'Michael', lastName: 'Jordan', status: 'inactive' },
    { firstName: 'Michael', lastName: 'Jordan', status: 'inactive' },
    { firstName: 'Michael', lastName: 'Jordan', status: 'inactive' },
    { firstName: 'Michael', lastName: 'Jordan', status: 'inactive' },
    { firstName: 'Michael', lastName: 'Jordan', status: 'inactive' },
    { firstName: 'Michael', lastName: 'Jordan', status: 'inactive' },
    { firstName: 'Michael', lastName: 'Jordan', status: 'inactive' },
    { firstName: 'Michael', lastName: 'Jordan', status: 'inactive' },
  ]);

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    setAnchorEl(null);

    // TODO this should be moved in profile
    getUser().then((data) => {
      console.log('Success:', data);
      const user = data;
    });

    // TODO this is wrong but idk why
    return <Profile></Profile>;
  };

  const logout = () => {
    history.push('/logout');
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static">
        <Toolbar variant="dense">
          <img src={logo} className={classes.logo} />
          <div className={classes.separator}></div>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={logout}>Log out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      {/* Layout al aplicatiei */}
      <Grid
        container
        spacing={0}
        style={{ height: 'calc(100% - 48px)', width: '100%' }}
        xs={12}
      >
        <Grid style={{ height: '100%' }} item xs={2}>
          <FriendsList friends={friends}></FriendsList>
        </Grid>
        <Grid style={{ backgroundColor: 'green', height: '100%' }} item xs={10}>
          <div>Chat Area</div>
        </Grid>
      </Grid>
      {/*  */}
    </div>
  );
};

export default FriendsListType;
