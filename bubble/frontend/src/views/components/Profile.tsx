import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { AccountCircle, Face, AlternateEmail } from '@material-ui/icons'
import { useUser } from '../../hooks/useUser'
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
      backgroundColor: '#333333',
    },
    title: {
      fontSize: "18px",
      flexGrow: 1,
      fontWeight: "bold"
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      marginRight: theme.spacing(2),
    },
  }),
)

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Profile() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const user = useUser()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (!user?.id) {
    return <div></div>
  }

  return (
    <div>
      <div onClick={handleOpen}>Profile</div>
      {/* <Modal
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
      > */}
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar variant="dense">
            <IconButton edge="start" className={classes.logo} color="inherit" aria-label="logo">
              <AccountCircle />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Profile
          </Typography>
          <IconButton edge="end"  color="inherit" aria-label="logo"  onClick={handleClose}>
              <CloseIcon />
            </IconButton>

          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <ListItemIcon>
              <AlternateEmail />
            </ListItemIcon>
            <ListItemText primary="E-mail address" secondary={user.email} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <Face />
            </ListItemIcon>
            <ListItemText primary="First name" secondary={user.first_name == undefined ? "Not set" : user.first_name} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <Face />
            </ListItemIcon>
            <ListItemText primary="Last name" secondary={user.last_name == undefined ? "Not set" : user.last_name} />
          </ListItem>
        </List>
      </Dialog>
    </div>
  )
}
