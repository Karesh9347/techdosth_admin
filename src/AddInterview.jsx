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
const AddInterview = () => {  const [formData, setFormData] = useState({
    subject: "",
    question: "",
    answer: "",
    resource:"",
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
      .post("https://techdosth-backend.onrender.com/add-interview", formData)
      .then((response) => {
        alert("interview question added successfully");
        setFormData({
            subject: "",
            question: "",
            answer: "",
            resource:"",
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
              <FormLabel>Enter subject name</FormLabel>
              <FormControl
                type="text"
                name="subject"
                onChange={handleChange}
                value={formData.subject}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Enter question</FormLabel>
              <FormControl
                type="text"
                name="question"
                onChange={handleChange}
                value={formData.question}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>enter answer</FormLabel>
              <FormControl
                type="text"
                name="answer"
                onChange={handleChange}
                value={formData.answer}
                required
              >
               
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormLabel>add resource learn it</FormLabel>
              <FormControl
               type="text"
                name="resource"
                onChange={handleChange}
                value={formData.resource}
                required
              >
               
              </FormControl>
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        </Col>

      </Row>
    </Container>)
}

export default AddInterview