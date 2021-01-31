/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PhoneIcon from '@material-ui/icons/PhoneIphone';
import ListItemLink from './ListItemLink';

const SideMenu = ({ classes, open, handleClose }) => {
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <List>
        <ListItemLink primary="Phones" to="/app/phones" icon={<PhoneIcon />} />
      </List>
    </Drawer>
  );
};

SideMenu.propTypes = {
  handleClose: PropTypes.func.isRequired,
  classes: PropTypes.object,
  open: PropTypes.bool,
};

SideMenu.defaultProps = {
  open: false,
  classes: {},
};

export default SideMenu;
