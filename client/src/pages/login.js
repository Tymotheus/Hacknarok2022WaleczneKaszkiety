import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { loginUser } from "../reducers/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Form className="p-5 bg-white" style={{ width: "40vw" }}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter email"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button
        onClick={(e) => {
          e.preventDefault();
        //   console.log({ email, password });
          loginUser({ email, password });
        }}
        variant="primary"
        type="submit"
        className="w-100"
      >
        Submit
      </Button>
    </Form>
  );
};

export default LoginPage;
