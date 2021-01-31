/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AvatarMenu from './AvatarMenu';
import SideMenu from './SideMenu';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  noLinkDecoration: {
    '&>a': {
      color: 'inherit',
      textDecoration: 'none',
    },
  },
  title: {
    flexGrow: 1,
    '&>a': {
      color: 'inherit',
      textDecoration: 'none',
    },
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function NavBar({ authState, handleSignout }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const avatarOpen = Boolean(anchorEl);

  const handleAvatarMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const onSignOutClick = () => {
    handleAvatarClose();
    handleSignout();
  };

  const isSignedIn = authState && authState.user;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {isSignedIn && (
            <IconButton
              edge="start"
              className={clsx(classes.menuButton, menuOpen && classes.hide)}
              color="inherit"
              aria-label="open menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h5" className={classes.title}>
            <Link to={isSignedIn ? '/app' : '/'}>Tsunami Alert</Link>
          </Typography>
          {isSignedIn ? (
            <AvatarMenu
              classes={classes}
              open={avatarOpen}
              anchorEl={anchorEl}
              handleMenu={handleAvatarMenu}
              handleClose={handleAvatarClose}
              onSignOutClick={onSignOutClick}
            />
          ) : (
            <Typography variant="h6" className={classes.noLinkDecoration}>
              <Link to="/signin">Sign In</Link>
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <SideMenu
        open={menuOpen}
        handleClose={handleMenuClose}
        classes={classes}
      />
    </div>
  );
}
