import React, { useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import { Row, Col, Form, Button, Alert, Container } from "react-bootstrap";
import "./AddAptitude.css";  // Import the custom CSS file

const AddAptitude = () => {
  const [formData, setFormData] = useState({
    questionName: "",
    difficultyLevel: "",
    description: "",
    hashtags: "", // New field for hashtags
  });

  const [solution, setSolution] = useState(""); // To store the Base64 string of the selected image
  const [message, setMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSolution(reader.result); // Store the Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { questionName, difficultyLevel, description, hashtags } = formData;

    // Validation check for required fields
    if (!questionName || !difficultyLevel || !description || !solution) {
      setMessage("All fields are required, including the image.");
      return;
    }

    try {
      // Process hashtags into an array by splitting and trimming spaces
      const hashtagsArray = hashtags ? hashtags.split(',').map(tag => tag.trim()) : [];

      // Include the Base64 image string and hashtags in the form data
      const dataToSend = {
        questionName,
        difficultyLevel,
        description,
        solution,
        hashtags: hashtagsArray
      };

      // Axios POST request to add aptitude question
      const response = await axios.post(
        "http://localhost:5000/add-aptitude",
        dataToSend
      );

      // Handle success response
      if (response.status === 201) {
        setMessage("Aptitude question added successfully!");
        setFormData({
          questionName: "",
          difficultyLevel: "",
          description: "",
          hashtags: ""
        });
        setSolution(""); // Reset image
      }
    } catch (error) {
      setMessage(
        `Error: ${error.response?.data?.error || "Unable to add question."}`
      );
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <AdminSidebar />
        </Col>
        <Col md={9}>
        {message && (
            <Alert variant={message.includes("Error") ? "danger" : "success"} className="mt-3">
              {message}
            </Alert>
          )}
          <h2 className="form-title">Add Aptitude Question</h2>
          <Form onSubmit={handleSubmit} className="aptitude-form">
            <Form.Group>
              <Form.Label>Question Name</Form.Label>
              <Form.Control
                type="text"
                name="questionName"
                value={formData.questionName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Difficulty Level</Form.Label>
              <Form.Control
                as="select"
                name="difficultyLevel"
                value={formData.difficultyLevel}
                onChange={handleChange}
              >
                <option value="">Select difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Hashtags (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                name="hashtags"
                value={formData.hashtags}
                onChange={handleChange}
                placeholder="e.g., math, easy, logic"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="submit-btn mt-3">
              Add Question
            </Button>
          </Form>

          {/* Display success/error message */}
         
        </Col>
      </Row>
    </Container>
  );
};

export default AddAptitude;
