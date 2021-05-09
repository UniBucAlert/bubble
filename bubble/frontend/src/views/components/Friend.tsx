import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';

import logo from '../../assets/active.png';

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
    }
}));

function Friend() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <img className={classes.logo} src={logo} alt="logo"></img>
            <ListItemText primary='&nbsp; Alexandru Tifui' />
        </div>
    )
}

export default Friend
