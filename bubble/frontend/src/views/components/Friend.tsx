import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import activeLogo from '../../assets/active.png';
import inactiveLogo from '../../assets/inactive.png'
import { removeFriend, getContacts } from '../../utils'

import SentimentVerySatisfiedTwoToneIcon from '@material-ui/icons/SentimentVerySatisfiedTwoTone';
import HelpTwoToneIcon from '@material-ui/icons/HelpTwoTone';
import FaceIcon from '@material-ui/icons/Face';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

    },
    logo: {
        paddingTop: 20,
        paddingBottom: 20,
        height: 40,
        width: 40,
        marginRight: 7,
    },
    request: {
        color: 'orange'
    },
    friend: {
        color: 'green'
    }, 
    unaccepted:{
        color:'gray'
    },
    trash: {
        marginLeft: 0,
        marginRight: -300,
        paddingRight: 10,
    }

}));

interface Props {
    email: string,
    friend_status: string,
    setFriends: any
}



function Friend({ email, friend_status, setFriends }: Props) {
    const classes = useStyles();

    const handleRemove = () => {
        removeFriend(email).then((msg) => {
            console.log(msg);

            getContacts().then((fl) => {
                setFriends(fl)
            })

        }).catch((msg) => {
            console.log('Promise rejected ' + msg);
        });
    }

    return (
        <div className={classes.container}>
            {(() => {
                if (friend_status == "mutuals") {
                    return (<SentimentVerySatisfiedTwoToneIcon className={[classes.logo, classes.friend].join(" ")} />)
                } else if (friend_status == "friended_me") {
                    return (<HelpTwoToneIcon className={[classes.logo, classes.request].join(" ")} />)
                } else {
                    return (<FaceIcon  className={[classes.logo, classes.unaccepted].join(" ")}/>)
                }

            })()}
            <ListItemText primary={`${email}`} />
            {(() => {
                if (friend_status == "mutuals" || friend_status == "i_friended") {
                return (<div className={classes.trash}>
                <IconButton onClick={handleRemove}>
                    <DeleteIcon />
                </IconButton>
            </div>
                )}
            })()}
        </div>
    )
}

export default Friend
