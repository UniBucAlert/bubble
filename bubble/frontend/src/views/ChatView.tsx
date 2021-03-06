import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Grid from '@material-ui/core/Grid'
import logo from '../assets/logo-text-inline.png'

import Profile from './components/Profile'
import { Chat } from '../firebase/Chat'
import FriendsList from './components/FriendsList'
import { getContacts, logout } from '../utils'
import { User } from '../models/User.model'
import '../index.css'

import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from '../redux'
import { setActiveChat } from '../redux/features/chat'
import { useUser } from '../hooks/useUser'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: '100vh',
    backgroundColor: 'white',
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
  chatWindow: {
    backgroundColor: '#dbe0e5',
    backgroundImage:
      'url(' +
      "data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23a3b9cf' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E)",
  },
}))

interface FriendsListType {
  friends: User[]
}

export const ChatView = React.memo(() => {
  const classes = useStyles()
  const history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [friends, setFriends] = React.useState([])
  const dispatch = useAppDispatch()

  const openedFriend = useSelector((state: AppState) => state.chat.friend)
  const user = useUser()

  const open = Boolean(anchorEl)

  const myLogout = () => {
    logout();
    history.push("/logout")
  }

  useEffect(() => {
    getContacts().then((fl) => {
      setFriends(fl)
    })
  }, [])

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    dispatch(setActiveChat(null))
  }, [user?.id])

  if (!user?.id) {
    return null
  }

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
              <MenuItem onClick={handleClose}>
                <Profile></Profile>
              </MenuItem>
              <MenuItem onClick={myLogout}>Log out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      {/* Layout al aplicatiei */}
      <Grid container spacing={0} style={{ height: 'calc(100% - 48px)', width: '100%' }} xs={12}>
        <Grid style={{ height: '100%' }} item xs={2}>
          <FriendsList friends={friends} setFriends={setFriends}></FriendsList>
        </Grid>
        <div style={{ display: 'flex', flex: 1 }}>
          {openedFriend && <Chat meId={user.id.toString()} otherId={openedFriend.toString()} />}
        </div>
      </Grid>
    </div>
  )
})

export default FriendsListType
