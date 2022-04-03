import React from "react";
import {Form} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { changeStatus } from "../reducers/authSlice";


const IssueStatus = ({selectedValue}) => {
  const dispatcher = useDispatch();
  return (<Form.Select style={{width: "200px"}} aria-label="Default select example" onChange={(event)=>dispatcher(changeStatus({device: selectedValue, newStatus: event.target.value}))}> 
    <option>Open this select menu</option>
    <option selected={selectedValue.status === "Pending"} value="Pending">Pending</option>
    <option selected={selectedValue.status === "Done"} value="Done">Done</option>
  </Form.Select>)
};

export default IssueStatus;