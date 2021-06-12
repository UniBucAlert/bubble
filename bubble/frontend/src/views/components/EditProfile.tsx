import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AuthState } from '../../redux/features/auth';
import { useAppDispatch, useAppSelector } from '../../redux';
import { useUser } from '../../hooks/useUser';
import { editUser, getUser } from '../../utils/users';
import { setUser } from '../../redux/features/auth'


export default function EditProfile() {
  const [open, setOpen] = React.useState(false);
  const user = useAppSelector((state) => state.auth.user)

  const dispatch = useAppDispatch()
  const [email, setEmail] = React.useState(user?.email);
  const [first_name, setFirstName] = React.useState(user?.first_name);
  const [last_name, setLastName] = React.useState(user?.last_name);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = () => {
      editUser(user?.id,email,first_name,last_name).then(res =>  {
        getUser().then((data) => {
            dispatch(setUser(data))
          })
      }).then(res => handleClose())
  }


  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen}>
        Edit profile
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit profile</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e => setEmail(e.target.value))}
            fullWidth
          />
           <TextField
            autoFocus
            margin="dense"
            id="first_name"
            label="First Name"
            required
            value={first_name}
            onChange={(e => setFirstName(e.target.value))}
            fullWidth
          />
           <TextField
            autoFocus
            margin="dense"
            id="last_name"
            label="Last name"
            value={last_name}
            onChange={(e => setLastName(e.target.value))}

            required
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}