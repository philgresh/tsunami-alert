import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const AvatarMenu = ({
  open,
  handleMenu,
  anchorEl,
  handleClose,
  onSignOutClick,
}) => {
  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={onSignOutClick}>Sign Out</MenuItem>
      </Menu>
    </div>
  );
};

AvatarMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  handleMenu: PropTypes.func.isRequired,
  anchorEl: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  handleClose: PropTypes.func.isRequired,
  onSignOutClick: PropTypes.func.isRequired,
};

export default AvatarMenu;
