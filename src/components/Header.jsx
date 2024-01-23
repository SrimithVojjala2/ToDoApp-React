/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import {Box,AppBar,Toolbar,Typography} from '@mui/material'
import Styles from '../ToDoAppStyles';
import { withStyles } from "@mui/styles";

const HeaderBarView = ({ classes }) => (
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

const HeaderBar =withStyles(Styles)(HeaderBarView);

export default HeaderBar;