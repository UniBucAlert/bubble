import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';

import activeLogo from '../../assets/active.png';
import inactiveLogo from '../../assets/inactive.png'

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
    }

}));

interface Props {
    email: string,
    friend_status: string
}



function Friend({ email, friend_status }: Props) {
    const classes = useStyles();
    console.log(friend_status)
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
        </div>
    )
}

export default Friend
