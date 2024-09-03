import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const AddQuestion = () => {
    const [questionName, setQuestionName] = useState('');
    const [description, setDescription] = useState('');
    const [problemlink, setProblemlink] = useState('');
    const [videolink, setVideolink] = useState('');
    const [hashtags, setHashtags] = useState('');
    const [difficulty, setDifficulty] = useState('Easy');
    const [images, setImages] = useState({
        cppBruteForce: '',
        cppOptimized: '',
        cppBetter: '',
        javaBruteForce: '',
        javaOptimized: '',
        javaBetter: '',
        pythonBruteForce: '',
        pythonOptimized: '',
        pythonBetter: '',
    });
    const [complexities, setComplexities] = useState({
        tc1: '',
        sc1: '',
        tc2: '',
        sc2: '',
        tc3: '',
        sc3: '',
    });
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages(prevImages => ({
                    ...prevImages,
                    [name]: reader.result.split(',')[1]
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const hashtagArray = hashtags.split(',').map(tag => tag.trim());

        // Validation
        if (!questionName || !problemlink || !videolink || !hashtags || !difficulty || !description ||
            !images.cppBruteForce || !images.cppOptimized || !images.cppBetter ||
            !images.javaBruteForce || !images.javaOptimized || !images.javaBetter ||
            !images.pythonBruteForce || !images.pythonOptimized || !images.pythonBetter) {
            setMessage('All fields are required.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/add-question', {
                QuestionName: questionName,
                description,
                problemlink,
                videolink,
                hashtags: hashtagArray,
                difficulty,
                images,
                complexities
            });
            setMessage(response.data);
            clearForm();
        } catch (error) {
            setMessage('Error: ' + (error.response ? error.response.data : 'An error occurred'));
        }
    };

    const clearForm = () => {
        setQuestionName('');
        setDescription('');
        setProblemlink('');
        setVideolink('');
        setHashtags('');
        setDifficulty('Easy');
        setImages({
            cppBruteForce: '',
            cppOptimized: '',
            cppBetter: '',
            javaBruteForce: '',
            javaOptimized: '',
            javaBetter: '',
            pythonBruteForce: '',
            pythonOptimized: '',
            pythonBetter: '',
        });
        setComplexities({
            tc1: '',
            sc1: '',
            tc2: '',
            sc2: '',
            tc3: '',
            sc3: '',
        });
    };

    return (
        <Container>
            <h1 className="my-4">Add a New Question</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="formQuestionName">
                    <Form.Label column sm="2">Question Name:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            value={questionName}
                            onChange={(e) => setQuestionName(e.target.value)}
                            required
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formDescription">
                    <Form.Label column sm="2">Description:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            as="textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formProblemLink">
                    <Form.Label column sm="2">Problem Link:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="url"
                            value={problemlink}
                            onChange={(e) => setProblemlink(e.target.value)}
                            pattern="https?://.*"
                            required
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formVideoLink">
                    <Form.Label column sm="2">Video Link:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="url"
                            value={videolink}
                            onChange={(e) => setVideolink(e.target.value)}
                            pattern="https?://.*"
                            required
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHashtags">
                    <Form.Label column sm="2">Hashtags:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            value={hashtags}
                            onChange={(e) => setHashtags(e.target.value)}
                            placeholder="Comma-separated"
                            required
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formDifficulty">
                    <Form.Label column sm="2">Difficulty Level:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            as="select"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            required
                        >
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </Form.Control>
                    </Col>
                </Form.Group>

                {/* C++ Images */}
                <Form.Group as={Row} className="mb-3" controlId="formCppBruteForce">
                    <Form.Label column sm="2">C++ Brute Force Image:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="file"
                            name="cppBruteForce"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formCppOptimized">
                    <Form.Label column sm="2">C++ Optimized Image:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="file"
                            name="cppOptimized"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formCppBetter">
                    <Form.Label column sm="2">C++ Better Image:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="file"
                            name="cppBetter"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                    </Col>
                </Form.Group>

                {/* Java Images */}
                <Form.Group as={Row} className="mb-3" controlId="formJavaBruteForce">
                    <Form.Label column sm="2">Java Brute Force Image:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="file"
                            name="javaBruteForce"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formJavaOptimized">
                    <Form.Label column sm="2">Java Optimized Image:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="file"
                            name="javaOptimized"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formJavaBetter">
                    <Form.Label column sm="2">Java Better Image:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="file"
                            name="javaBetter"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                    </Col>
                </Form.Group>

                {/* Python Images */}
                <Form.Group as={Row} className="mb-3" controlId="formPythonBruteForce">
                    <Form.Label column sm="2">Python Brute Force Image:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="file"
                            name="pythonBruteForce"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPythonOptimized">
                    <Form.Label column sm="2">Python Optimized Image:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="file"
                            name="pythonOptimized"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPythonBetter">
                    <Form.Label column sm="2">Python Better Image:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="file"
                            name="pythonBetter"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                    </Col>
                </Form.Group>

                {/* Complexity Fields */}
                <Form.Group as={Row} className="mb-3" controlId="formTC1">
                    <Form.Label column sm="2">Time Complexity 1:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            value={complexities.tc1}
                            onChange={(e) => setComplexities({ ...complexities, tc1: e.target.value })}
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formSC1">
                    <Form.Label column sm="2">Space Complexity 1:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            value={complexities.sc1}
                            onChange={(e) => setComplexities({ ...complexities, sc1: e.target.value })}
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formTC2">
                    <Form.Label column sm="2">Time Complexity 2:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            value={complexities.tc2}
                            onChange={(e) => setComplexities({ ...complexities, tc2: e.target.value })}
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formSC2">
                    <Form.Label column sm="2">Space Complexity 2:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            value={complexities.sc2}
                            onChange={(e) => setComplexities({ ...complexities, sc2: e.target.value })}
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formTC3">
                    <Form.Label column sm="2">Time Complexity 3:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            value={complexities.tc3}
                            onChange={(e) => setComplexities({ ...complexities, tc3: e.target.value })}
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formSC3">
                    <Form.Label column sm="2">Space Complexity 3:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            value={complexities.sc3}
                            onChange={(e) => setComplexities({ ...complexities, sc3: e.target.value })}
                            required
                        />
                    </Col>
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
            {message && <Alert className="mt-3" variant="info">{message}</Alert>}
        </Container>
    );
};

export default AddQuestion;
