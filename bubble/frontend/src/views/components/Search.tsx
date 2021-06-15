import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { getContacts } from '../../utils'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '90%',
            },
        },
    }),
);

function Search({ setFriends }: any) {
    const classes = useStyles();

    const handleSearch = () => {
        getContacts().then((friends) => {
            let friendName = '';
            let input = document.getElementById('search-friend');
            if (input) {
                friendName = (input as HTMLInputElement).value;
            }

            let filterFunction = (friend: any) => {
                if (friendName === '')
                    return true;

                let pos = friend['email'].search('@');
                if (pos === -1)
                    return true;
                
                let firendEmail = friend['email'].slice(0, pos);
                if (firendEmail.toLowerCase().indexOf(friendName.toLowerCase()) !== -1)
                    return true;
                return false;
            }

            const newFriends = friends.filter(filterFunction);
            setFriends(newFriends);
        })
    }

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                fullWidth={true}
                id="search-friend"
                label="Find friend"
                onChange={handleSearch}
            />
        </form>
    );
}

export default Search
