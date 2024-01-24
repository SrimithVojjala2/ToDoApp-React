/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import Styles from '../ToDoAppStyles';
import { withStyles } from "@mui/styles";

class HeaderBar extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Box>
        <AppBar
          component="nav"
          position="relative"
          style={{ backgroundColor: "steelblue" }}
        >
          <Toolbar className={classes.title}>
            <Typography variant="h5">ToDo App</Typography>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

export default withStyles(Styles)(HeaderBar);
