import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';

import activeLogo from '../../assets/active.png';
import inactiveLogo from '../../assets/inactive.png'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

    },
    logo: {
        paddingTop: 20,
        paddingBottom: 20,
        height: 30,
        width: 30,
        marginRight: 7,
    }
}));

interface Props {
    email: string,
    status: string;
}

function Friend({ email, status }: Props) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            {
                status === "active" ?
                <img className={classes.logo} src={activeLogo} alt="active-logo"></img> :
                <img className={classes.logo} src={inactiveLogo} alt="inactive-logo"></img>
            }
            <ListItemText primary={`${email}`} />
        </div>
    )
}

export default Friend
