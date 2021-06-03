import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import { addFriend, getContacts } from '../../utils'

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
        input: {
            '& > *': {
                margin: theme.spacing(1),
                width: '90%',
            },
        },
        margin: {
            margin: theme.spacing(1),
        },
        center: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
    }),
);

function AddButton({ setFriends }: any) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [infoOpen, setInfoOpen] = React.useState(false);
    const [infoMessage, setInfoMessage] = React.useState("");

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInfoClose = () => {
        setInfoOpen(false);
    }

    React.useEffect(() => {
        if (infoMessage !== "")
            setInfoOpen(true);
    }, [infoMessage]);

    const handleSubmit = () => {
        let input = document.getElementById("add-friend-input") as HTMLInputElement;
        let emailAddr = input ? input.value : undefined;
        if (emailAddr === null || emailAddr === undefined || emailAddr === "") 
            return;

        addFriend(emailAddr).then((msg) => {
            setInfoMessage(msg);
            handleClose();

            getContacts().then((fl) => {
                setFriends(fl)
            })

        }).catch((err) => {
            console.error(err)
            let msg = "You already have that friend";
            if (err === 404)
                msg = "User not found";
            setInfoMessage(msg);
            handleClose();
        });
    };

    return (
        <div>
            <IconButton aria-label="delete" onClick={handleOpen}>
                <PersonAddIcon fontSize="large" />
            </IconButton>

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
                        <form className={classes.input} noValidate autoComplete="off">
                            <TextField fullWidth={true} id="add-friend-input" label="Enter your friend's email" />
                        </form>
                        <Button variant="contained" size="medium" color="primary" className={classes.margin} onClick={handleSubmit}>
                            <AddIcon></AddIcon>
                            Add
                        </Button>
                        <Button variant="contained" size="medium" color="primary" className={classes.margin} onClick={handleClose}>
                            <CloseIcon></CloseIcon>
                            Close
                        </Button>
                    </div>
                </Fade>
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={infoOpen}
                onClose={handleInfoClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={infoOpen}>
                    <div className={classes.paper}>
                        <h2 id="info-modal-title">{infoMessage}</h2>
                        <div className={classes.center}>
                            <Button variant="contained" size="large" color="primary" className={classes.margin} onClick={handleInfoClose}>
                                <CloseIcon></CloseIcon>
                                Close
                            </Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default AddButton
