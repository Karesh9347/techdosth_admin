import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import AdminSidebar from './AdminSidebar';

const AddQuery = () => {
  const [formData, setFormData] = useState({
    shortName: '',
    description: '',
    actualQuery: '',
    difficultyLevel: '',
    relatedTopics: ''
  });

  const [responseMessage, setResponseMessage] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('https://techdosth-backend.onrender.com/add-query', {
            ...formData,
            relatedTopics: formData.relatedTopics.split(',').map(topic => topic.trim()),
          });
          
      setResponseMessage('Query added successfully!');
      setFormData({
        shortName: '',
        description: '',
        actualQuery: '',
        difficultyLevel: '',
        relatedTopics: ''
      }); // Reset form after successful submission
    } catch (error) {
      console.log(error);
      setResponseMessage('Error adding query.');
    }
  };

  return (
    <Container>
      <Row>
        <Col md={2}>
          <AdminSidebar />
        </Col>
        <Col md={10}>
          <h2>Add Query of the Day</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="shortName">Short Name</label>
              <input
                type="text"
                className="form-control"
                name="shortName"
                value={formData.shortName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="actualQuery">Actual Query</label>
              <textarea
                className="form-control"
                name="actualQuery"
                value={formData.actualQuery}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="difficultyLevel">Difficulty Level</label>
              <select
                className="form-control"
                name="difficultyLevel"
                value={formData.difficultyLevel}
                onChange={handleChange}
                required
              >
                <option value="">Select Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="relatedTopics">Related Topics (comma-separated)</label>
              <input
                type="text"
                className="form-control"
                name="relatedTopics"
                value={formData.relatedTopics}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Query</button>
          </form>
          {responseMessage && <p>{responseMessage}</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default AddQuery;
