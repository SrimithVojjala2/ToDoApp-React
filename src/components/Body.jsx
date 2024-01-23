/* eslint-disable react/prop-types */
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

const BodyView = ({
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
  handleDeleteCheckBox,
  activeDelete,
  allSelectValue,
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
  const handleDeleteCheckBoxClick = () => {
    handleDeleteCheckBox();
  };
  const DeleteButton = () => {
    if (activeDelete()) {
      return (
        <>
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            style={{ backgroundColor: "steelblue" }}
            onClick={() => handleDeleteCheckBoxClick()}
          >
            Delete
          </Button>
        </>
      );
    } else {
      return null;
    }
  };
  return (
    <>
      <Container className={classes.BodyContainer}>
        <Box className={classes.BtnAdd}>
          <DeleteButton />
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
    </>
  );
};

const Body = withStyles(Styles)(BodyView)
export default Body;
