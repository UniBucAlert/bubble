import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';

import activeLogo from '../../assets/active.png';
import inactiveLogo from '../../assets/inactive.png'

import SentimentVerySatisfiedTwoToneIcon from '@material-ui/icons/SentimentVerySatisfiedTwoTone';
import HelpTwoToneIcon from '@material-ui/icons/HelpTwoTone';
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
        color:'orange'
    },
    friend: {
        color:'green'
    }

}));

interface Props {
    email: string,
    is_friend:boolean
}

function Friend({ email, is_friend }: Props) {
    const classes = useStyles();
    console.log(is_friend)
    return (
        <div className={classes.container}>
            {
                is_friend == true ?
                <SentimentVerySatisfiedTwoToneIcon className={[classes.logo, classes.friend].join(" ")} /> :
                <HelpTwoToneIcon className={[classes.logo, classes.request].join(" ")} />
            }
            <ListItemText primary={`${email}`} />
        </div>
    )
}

export default Friend
