/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { Component } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Typography,
  Toolbar,
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  Checkbox,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import Styles from "./ToDoAppStyles";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ToDo from "./ToDo";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

class ToDoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ToDos: [],
      openAddToDo: false,
      id: 1,
      allSelectValue: false,
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
      console.log(updatedToDos);
    }
  };

  handleCheckbox = (Index) => {
    const updatedToDos = this.state.ToDos.map((row, index) =>
      index === Index ? { ...row, completed: !row.completed } : row
    );
    this.setState({ ToDos: updatedToDos });
  };

  handleAllCheckbox = () => {
    const updatedRows = this.state.ToDos.map((row) => ({
      ...row,
      completed: !row.completed,
    }));
    this.setState({ ToDos: updatedRows });
  };

  handleAllSelectValue = () => {
    this.setState(
      (prev) => ({
        allSelectValue: !prev.allSelectValue,
      }),
      this.handleAllCheckbox
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
          handleDeleteCheckBox = {this.handleDeleteCheckBox}
        />
        <pre>{JSON.stringify(this.state.ToDos, null, 2)}</pre>
      </>
    );
  }
}

const HeaderBar = ({ classes }) => (
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

const Body = ({
  classes,
  ToDos,
  openAddToDo,
  handleOpenToDo,
  handleCloseToDo,
  addToDo,
  handleDelete,
  handleEdit,
  handleDragEnd,
  handlePinChange,
  handleAllSelectValue,
  handleCheckbox,
  handleDeleteCheckBox
}) => {
  const handleOpen = () => {
    handleOpenToDo();
  };
  const handleClose = () => {
    handleCloseToDo();
  };
  const handleaddToDo = () => {
    const taskValue = document.getElementById("taskValue").value;
    addToDo(taskValue);
    document.getElementById("taskValue").value = "";
    handleCloseToDo();
  };
  const handleDeleteCheckBoxClick = () =>{ handleDeleteCheckBox()};
  return (
    <>
      <Container className={classes.BodyContainer}>
        <Box className={classes.BtnAdd}>
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            style={{ backgroundColor: "steelblue" }}
            onClick={() => handleDeleteCheckBoxClick()}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "steelblue", marginLeft: "10px" }}
            startIcon={<AddIcon />}
            onClick={() => handleOpen()}
          >
            Add new Todo
          </Button>
          <Dialog open={openAddToDo} onClose={handleClose}>
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
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleClose()}>Cancel</Button>
              <Button onClick={() => handleaddToDo()}>Add</Button>
            </DialogActions>
          </Dialog>
        </Box>
        <Box display={"flex"}>
          <TableView
            classes={classes}
            ToDos={ToDos}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleDragEnd={handleDragEnd}
            handlePinChange={handlePinChange}
            handleAllSelectValue={handleAllSelectValue}
            handleCheckbox={handleCheckbox}
          />
        </Box>
      </Container>
    </>
  );
};

const TableView = ({
  classes,
  handleCheckbox,
  allSelectValue,
  handleAllSelectValue,
  ToDos,
  handlePinChange,
  handleDelete,
  handleEdit,
  handleDragEnd,
}) => {
  const handleDragEndClick = (e) => {
    handleDragEnd(e);
  };
  const handleAllSelectValueClick = () => {
    handleAllSelectValue();
  };
  return (
    <>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <DragDropContext onDragEnd={handleDragEndClick}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className={classes.TableHead}>
              <TableRow>
                <TableCell width={"20px"} style={{ padding: "0px" }}>
                  <Checkbox
                    checked={allSelectValue}
                    onChange={handleAllSelectValueClick}
                    style={{ color: "white" }}
                  />
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: "white", margin: "0" }}
                  width={"60px"}
                >
                  Id
                </TableCell>
                <TableCell style={{ color: "white", paddingLeft: "15px" }}>
                  {" "}
                  ToDo
                </TableCell>
                <TableCell
                  style={{ color: "white" }}
                  align="right"
                  width={"50px"}
                >
                  Progress
                </TableCell>
                <TableCell
                  style={{ color: "white" }}
                  align="center"
                  width={"200px"}
                >
                  Edit / Remove
                </TableCell>
                <TableCell
                  style={{ color: "white" }}
                  align="left"
                  width={"150px"}
                >
                  Mark as Complete
                </TableCell>
              </TableRow>
            </TableHead>
            <Droppable droppableId="droppable-1">
              {(provider) => (
                <TableBody ref={provider.innerRef} {...provider.droppableProps}>
                  {ToDos.map((row, index) => (
                    <ToDo
                      row={row}
                      key={row.id}
                      index={index}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                      handlePinChange={handlePinChange}
                      onChecked={handleCheckbox}
                    />
                  ))}
                  {provider.placeholder}
                </TableBody>
              )}
            </Droppable>
          </Table>
        </DragDropContext>
      </TableContainer>
    </>
  );
};

export default withStyles(Styles)(ToDoApp);
