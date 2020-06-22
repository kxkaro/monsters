import React from 'react';
import clsx from 'clsx';
import { useStyles } from '../../styles/main';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HideOnScroll from './HideOnScroll';
import { ModeType, UserType } from '../../typings/types';


interface Props {
    user: UserType,
    name: string,
    mode: ModeType,
    setDarkMode: any,
    open: boolean,
    handleDrawerOpen: any,
    handleDrawerClose: any,
}


const NavBar = ({ user, name, mode, setDarkMode, open, handleDrawerOpen, handleDrawerClose }: Props) => {
    const classes = useStyles();

    return (
        <HideOnScroll>
            <AppBar
                color="primary"
                // position="absolute"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {name}
                    </Typography>

                    <Typography style={{ marginLeft: "auto" }} variant="h6" noWrap>
                        {user ? user.publicName : ''}
                    </Typography>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    );
}

export default NavBar;