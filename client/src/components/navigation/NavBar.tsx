import React from 'react';
import { useLocation } from "react-router-dom";
import clsx from 'clsx';
import { useStyles } from '../../styles/main';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Hidden } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HideOnScroll from '../../utils/HideOnScroll';
import { AuthButtonsHorizontal } from './AuthButtons';
import { ModeType, UserType } from '../../logic/types';
import { PATHS } from '../../constants/data';
const { home, login, logout, register } = PATHS;


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
    const location = useLocation();
    const path = location.pathname;

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
                    <Link to={home}>
                        <Typography variant="h6" noWrap>
                            {name}
                        </Typography>
                    </Link>
                    
                    {/* Show auth buttons only on other pages than authentication or home (includes those buttons on the jumbotron) */}
                    {![home, login, logout, register].includes(path) &&
                        <Hidden smDown>
                            <AuthButtonsHorizontal style={{ marginLeft: "auto" }} user={user} />
                        </Hidden>}
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    );
}

export default NavBar;