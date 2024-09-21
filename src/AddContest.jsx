import axios from "axios";
import React, { useState } from "react";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Container,
  Button,
  Row,Col
} from "react-bootstrap";
import AdminSidebar from "./AdminSidebar";

const AddContest = () => {
  const [formData, setFormData] = useState({
    contestName: "",
    contestLink: "",
    contestLevel: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://techdosth-backend-1.onrender.com/add-contest", formData)
      .then((response) => {
        alert("Contest added successfully");
        setFormData({
          contestName: "",
          contestLink: "",
          contestLevel: "",
        });
        console.log(response.data);
      })
      .catch((error) => {
        alert(
          "Error in adding contest: " + error.response?.data?.error ||
            error.message
        );
        console.error("There was an error!", error);
      });
  };

  return (
    <Container>
      <Row>
      <Col md={4}>
          <AdminSidebar />
        </Col>
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Enter Contest Name</FormLabel>
              <FormControl
                type="text"
                name="contestName"
                onChange={handleChange}
                value={formData.contestName}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Enter Contest Link</FormLabel>
              <FormControl
                type="text"
                name="contestLink"
                onChange={handleChange}
                value={formData.contestLink}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Enter Contest Level</FormLabel>
              <FormControl
                as="select" // Changed from text input to select
                name="contestLevel"
                onChange={handleChange}
                value={formData.contestLevel}
                required
              >
                <option value="">Select Level</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </FormControl>
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        </Col>

      </Row>
    </Container>
  );
};

export default AddContest;
