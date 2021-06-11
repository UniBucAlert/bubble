import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { AccountCircle, Face } from '@material-ui/icons'
import { useUser } from '../../hooks/useUser'
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

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
      {/* </Modal> */}
      </Dialog>
    </div>
  )
}
