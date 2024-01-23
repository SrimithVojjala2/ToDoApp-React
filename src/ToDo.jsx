/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { Component } from "react";
import { Draggable } from "@hello-pangea/dnd";
import {
  TableRow,
  TableCell,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
  Typography,
} from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import MarkAsUnreadOutlinedIcon from "@mui/icons-material/MarkAsUnreadOutlined";

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      openDeleteDialog: false,
      openEditDialog: false,
      updateEditvalue: "",
      hoverPin: false,
      pinValue: false,
    };
  }
  componentDidMount() {
    this.setState({ updateEditvalue: this.props.row.description });
  }

  handleCheckboxChange = () => {
    this.setState(
      (prevState) => ({
        checked: !prevState.checked,
      }),
      () => console.log(this.state.checked)
    );
  };

  handleClose = () => {
    this.setState({ openDeleteDialog: false, openEditDialog: false });
  };

  handleDelete = () => {
    this.props.handleDelete(this.props.index);
    this.handleClose();
  };

  handleEditClick = () => {
    this.props.handleEdit(this.props.row.id, this.state.updateEditvalue);
    this.handleClose();
  };

  handlePinChange = () => {
    this.props.handlePinChange(this.props.row.id, this.props.index);
    this.setState((prev) => ({ pinValue: !prev.pinValue }));
  };

  render() {
    const { row, index,onChecked } = this.props;
    const { checked, hoverPin, pinValue } = this.state;
    const activeClass = { textDecoration: checked ? "line-through" : "none" };
    const Pin = { display: hoverPin ? "block" : "none" };
    const hoverId = { display: !hoverPin ? "block" : "none" };
    return (
      <>
        <Draggable
          key={row.id}
          draggableId={row.description}
          index={index}
          isDragDisabled={pinValue}
        >
          {(dragProvider) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              {...dragProvider.draggableProps}
              {...dragProvider.dragHandleProps}
              ref={dragProvider.innerRef}
            >
              <TableCell>
                <Checkbox
                  checked={row.completed}
                  onChange={() => onChecked(index)}
                  style={{padding:'0',margin:'0'}}
                />
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                align="center"
                width={"60px"}
                onMouseOver={() => this.setState({ hoverPin: true })}
                onMouseOut={() => this.setState({ hoverPin: false })}
                style={{ ...activeClass }}
              >
                <Typography variant="body1" style={{ ...hoverId }}>
                  {row.id}
                </Typography>
                <Checkbox
                  icon={
                    <PushPinOutlinedIcon
                      style={{ transform: "rotate(50deg)" }}
                    />
                  }
                  checkedIcon={
                    <PushPinIcon
                      style={{ color: "steelblue", transform: "rotate(50deg)" }}
                    />
                  }
                  checked={pinValue}
                  style={{ ...Pin, padding: "0", alignItems: "center" }}
                  onChange={this.handlePinChange}
                />
              </TableCell>
              <TableCell style={{ paddingLeft: "15px", ...activeClass }}>
                {row.description}
              </TableCell>
              <TableCell align="right" style={{ ...activeClass }}>
                {row.progress}
              </TableCell>
              <TableCell align="center">
                <Button
                  style={{ color: "steelblue" }}
                  onClick={() => this.setState({ openEditDialog: true })}
                >
                  <EditIcon />
                </Button>
                <Button
                  style={{ color: "steelblue" }}
                  onClick={() => this.setState({ openDeleteDialog: true })}
                >
                  <DeleteIcon />
                </Button>

                <div className="Delete-Dialog">
                  <Dialog
                    open={this.state.openDeleteDialog}
                    onClose={this.handleClose}
                  >
                    <DialogContent>
                      <DialogContentText>
                        Are you sure want to Delete?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "steelblue" }}
                        onClick={() => this.handleClose()}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "steelblue" }}
                        onClick={() => this.handleDelete()}
                      >
                        Delete
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>

                <div className="Edit-Dialog">
                  <Dialog
                    open={this.state.openEditDialog}
                    onClose={this.handleClose}
                  >
                    <DialogContent>
                      <DialogContentText>
                        Edit the Task Details
                      </DialogContentText>
                      <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="editValue"
                        type="text"
                        value={this.state.updateEditvalue}
                        onChange={(e) =>
                          this.setState({ updateEditvalue: e.target.value })
                        }
                        style={{ width: "400px" }}
                        variant="standard"
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "steelblue" }}
                        onClick={() => this.handleClose()}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "steelblue" }}
                        onClick={() => this.handleEditClick()}
                      >
                        Add
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </TableCell>
              <TableCell
                align="left"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Checkbox
                  icon={<MarkAsUnreadOutlinedIcon />}
                  checkedIcon={
                    <MarkunreadIcon style={{ color: "steelblue" }} />
                  }
                  checked={checked}
                  onChange={this.handleCheckboxChange}
                />
              </TableCell>
            </TableRow>
          )}
        </Draggable>
      </>
    );
  }
}

export default ToDo;
