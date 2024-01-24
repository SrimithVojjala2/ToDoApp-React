/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  Button,
  Container,
  Box,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import TableApp from "./TableView";
import Styles from "../ToDoAppStyles";
import { withStyles } from "@mui/styles";

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskValue: "",
    };
  }

  handleOpen = () => {
    this.props.handleOpenToDo();
  };

  handleClose = () => {
    this.props.handleCloseToDo();
  };

  handleaddToDo = () => {
    const { addToDo } = this.props;
    addToDo(this.state.taskValue);
    this.setState({ taskValue: "" });
    this.handleClose();
  };

  handleDeleteCheckBoxClick = () => {
    this.props.handleDeleteCheckBox();
  };

  render() {
    const {
      classes,
      ToDos,
      openAddToDo,
      handleDelete,
      handleEdit,
      handleDragEnd,
      handlePinChange,
      handleAllSelectValue,
      handleCheckbox,
      activeDelete,
      allSelectValue,
    } = this.props;

    return (
      <Container className={classes.BodyContainer}>
        <Box className={classes.BtnAdd}>
          {activeDelete() && (
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              style={{ backgroundColor: "steelblue" }}
              onClick={this.handleDeleteCheckBoxClick}
            >
              Delete
            </Button>
          )}
          <Button
            variant="contained"
            style={{ backgroundColor: "steelblue", marginLeft: "10px" }}
            startIcon={<AddIcon />}
            onClick={this.handleOpen}
          >
            Add new Todo
          </Button>
          <Dialog open={openAddToDo} onClose={this.handleClose}>
            <DialogTitle>ToDo</DialogTitle>
            <DialogContent>
              <DialogContentText>Enter ToDo Task</DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="taskValue"
                label="Enter Task Details"
                type="text"
                style={{ width: "400px" }}
                variant="standard"
                value={this.state.taskValue}
                onChange={(e) => this.setState({ taskValue: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose}>Cancel</Button>
              <Button onClick={this.handleaddToDo}>Add</Button>
            </DialogActions>
          </Dialog>
        </Box>
        <Box display={"flex"}>
          <TableApp
            classes={classes}
            ToDos={ToDos}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleDragEnd={handleDragEnd}
            handlePinChange={handlePinChange}
            handleAllSelectValue={handleAllSelectValue}
            handleCheckbox={handleCheckbox}
            allSelectValue={allSelectValue}
          />
        </Box>
      </Container>
    );
  }
}

export default withStyles(Styles)(Body);
