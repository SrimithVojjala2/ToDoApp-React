/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import ToDo from "../ToDo";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import Styles from "../ToDoAppStyles";
import { withStyles } from "@mui/styles";

class TableView extends Component {
  handleDragEndClick = (e) => {
    this.props.handleDragEnd(e);
  };

  handleAllSelectValueClick = () => {
    this.props.handleAllSelectValue();
  };

  render() {
    const {
      classes,
      handleCheckbox,
      allSelectValue,
      ToDos,
      handlePinChange,
      handleDelete,
      handleEdit,
    } = this.props;

    return (
      <>
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <DragDropContext onDragEnd={this.handleDragEndClick}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className={classes.TableHead}>
                <TableRow>
                  <TableCell width={"35px"} style={{ padding: "0px"}}>
                    <Checkbox
                      checked={allSelectValue}
                      onChange={this.handleAllSelectValueClick}
                      style={{ color: "white", marginLeft:'8px' }}
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ color: "white", margin: "0"}}
                    width={"65px"}
                  >
                    <div>Id</div>
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
  }
}

export default withStyles(Styles)(TableView);
