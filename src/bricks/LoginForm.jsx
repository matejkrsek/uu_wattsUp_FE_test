import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { login } from "../calls";
import { hashPassword } from "../hashPassword";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const setField = (name, val) => {
    setFormData((formData) => {
      return { ...formData, [name]: val };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const hashedPassword = await hashPassword(formData.password); // Zahashuje heslo
    const hashedData = { ...formData, password: hashedPassword }; // Vytvoří nový objekt s hashovaným heslem

    login(hashedData); // Odeslání hashovaných dat
  };

  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        style={{
          width: "400px",
          margin: "25vh auto 0",
          transform: "translateY(-33%)",
        }}
      >
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            required
            onChange={(e) => {
              setField("email", e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={(e) => {
              setField("password", e.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
