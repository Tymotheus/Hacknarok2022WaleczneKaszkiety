import React from "react";
import {Form} from "react-bootstrap";

const IssueStatus = ({selectedValue}) => (
  <Form.Select style={{width: "200px"}} aria-label="Default select example">
    <option>Open this select menu</option>
    <option selected={selectedValue === "Pending"} value="Pending">Pending</option>
    <option selected={selectedValue === "Done"} value="Done">Done</option>
  </Form.Select>
);

export default IssueStatus;
