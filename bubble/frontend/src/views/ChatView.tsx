import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router';

import logo from '../assets/logo-text-inline.png';
import FriendsList from './components/FriendsList';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    width:'100px',
    marginTop:'2px',
    marginBottom:'2px'

  },
  separator: {
    flexGrow: 1,
  },
  appbar:{
    backgroundColor:'#333333'
  }
}));



export const ChatView: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [friends, setFriends] = React.useState([
      {'firstName': 'John', 'lastName': 'Smith', 'status': 'active'},
      { 'firstName': 'Michael', 'lastName': 'Jordan', 'status': 'inactive' }
    ]);

  const handleMenu = (event:any) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    history.push('/logout');
  }
  
  return <>
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
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={logout}>Log out</MenuItem>
          </Menu>
        </div>

    </Toolbar>
  </AppBar>
    <FriendsList friends={friends}></FriendsList>
  </>
};
