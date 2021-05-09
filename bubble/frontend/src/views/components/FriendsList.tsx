import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Paper from '@material-ui/core/Paper';

import Friend from './Friend'
import FriendsHeader from './FriendsHeader'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            maxWidth: 300,
        },
    }),
);

function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;

    return (
        <ListItem button style={style} key={index}>
            <Friend></Friend>
        </ListItem>
    );
}

export default function FriendsList() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <FriendsHeader></FriendsHeader>
            <Paper className={classes.root} elevation={3}>
                <FixedSizeList height={700} width={300} itemSize={70} itemCount={200}>
                    {renderRow}
                </FixedSizeList>
            </Paper>
        </div>
    );
}
