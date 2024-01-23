/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { Component } from "react";
import {
  Box,
  CssBaseline,
  Typography,
  Alert,
  Popover
} from "@mui/material";
import { withStyles } from "@mui/styles";
import Styles from "./ToDoAppStyles";
import Body from './components/Body'
import HeaderBar from "./components/Header";
class ToDoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ToDos: [],
      openAddToDo: false,
      id: 1,
      allSelectValue: false,
      anchorEl: null,
    };
  }
  handleOpenToDo = () => {
    this.setState({ openAddToDo: true });
  };

  activeDelete = () => {
    const { ToDos, allSelectValue } = this.state;

    // Check if 'todos' is defined and has at least one element
    const anyTodoCompleted =
      ToDos.some((todo) => todo.completed) || allSelectValue;

    return anyTodoCompleted;
  };

  handleCloseToDo = () => {
    this.setState({ openAddToDo: false });
  };

  handleDelete = (index) => {
    const updatedToDos = this.state.ToDos;
    updatedToDos.splice(index, 1);
    this.setState({ ToDos: updatedToDos });
  };

  handleDeleteCheckBox = () => {
    if (this.state.ToDos.length > 0) {
      const updatedToDos = this.state.ToDos.filter(
        (todo) => todo.completed === false
      );
      this.setState({ ToDos: updatedToDos });
      this.setState({ allSelectValue: false });
    } else {
      this.setState({ allSelectValue: false });
      this.setState({ anchorEl: document.body });
    }
  };

  handleClosePopover = () => {
    this.setState({ anchorEl: null });
  };

  handleCheckbox = (Index) => {
    const updatedToDos = this.state.ToDos.map((row, index) =>
      index === Index ? { ...row, completed: !row.completed } : row
    );
    this.setState({ ToDos: updatedToDos });
  };

  handleAllCheckbox = () => {
    const updatedRows = this.state.ToDos.map((row) => {
      if (this.state.allSelectValue !== true) {
        return {
          ...row,
          completed: true,
        };
      } else {
        return {
          ...row,
          completed: false,
        };
      }
    });
    this.setState({ ToDos: updatedRows });
  };

  handleAllSelectValue = () => {
    this.setState(
      (prev) => ({
        allSelectValue: !prev.allSelectValue,
      }),
      this.handleAllCheckbox()
    );
  };

  handleEdit = (id, value) => {
    const updatedToDos = this.state.ToDos.map((ToDo) =>
      ToDo.id === id ? { ...ToDo, description: value } : ToDo
    );
    this.setState({ ToDos: updatedToDos });
  };

  handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = this.state.ToDos;
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    this.setState({ ToDos: tempData });
  };

  handlePinChange = (id, index) => {
    const updatedToDos = [...this.state.ToDos];
    const movedToDo = updatedToDos.splice(index, 1)[0];
    updatedToDos.unshift(movedToDo);
    this.setState({ ToDos: updatedToDos });
  };

  addToDo = (taskValue) => {
    this.setState((prev) => ({
      ToDos: [
        ...prev.ToDos,
        {
          id: prev.id,
          description: taskValue,
          markasread: false,
          progress: "todo",
          completed: false,
        },
      ],
      id: prev.id + 1,
    }));
  };

  render() {
    const { classes } = this.props;
    const AllStates = { ...this.state };
    const isPopoverOpen = Boolean(this.state.anchorEl);
    return (
      <>
        <CssBaseline />
        <header>
          <HeaderBar classes={classes} />
        </header>
        <Typography
          variant="div"
          className={classes.Heading}
          marginTop={"20px"}
        >
          TODO LIST, ADD NEW TODO
        </Typography>
        <Popover
          open={isPopoverOpen}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClosePopover}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box p={2}>
            <Alert severity="error">
              No Todos available!
            </Alert>
          </Box>
        </Popover>
        <Body
          classes={classes}
          {...AllStates}
          handleOpenToDo={this.handleOpenToDo}
          handleCloseToDo={this.handleCloseToDo}
          addToDo={this.addToDo}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          handleDragEnd={this.handleDragEnd}
          handlePinChange={this.handlePinChange}
          handleAllSelectValue={this.handleAllSelectValue}
          handleCheckbox={this.handleCheckbox}
          handleDeleteCheckBox={this.handleDeleteCheckBox}
          activeDelete={this.activeDelete}
        />
      </>
    );
  }
}



export default withStyles(Styles)(ToDoApp);
