import React, { useState } from "react";
import axios from "axios";

const AddProblem = () => {
  const [formData, setFormData] = useState({QuestionName: "",
    actualcode: "",
    videolink: "",
    hashtags: "",
    difficulty: "Easy",
    description: "",
    driverCode: "",
    pythonBruteForce: "",
    pythonBetter: "",
    pythonOptimized: "",
    tc1: "",
    sc1: "",
    tc2: "",
    sc2: "",
    tc3: "",
    sc3: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://techdosth-backend.onrender.com/add-problem-of-the-day", {
        QuestionName: formData.QuestionName,
        actualcode: formData.actualcode,
        videolink: formData.videolink,
        hashtags: formData.hashtags.split(","),
        difficulty: formData.difficulty,
        description: formData.description,
        driverCode: formData.driverCode,
        solution: {
          pythonBruteForce: formData.pythonBruteForce,
          pythonBetter: formData.pythonBetter,
          pythonOptimized: formData.pythonOptimized,
        },
        complexities: {
          tc1: formData.tc1,
          sc1: formData.sc1,
          tc2: formData.tc2,
          sc2: formData.sc2,
          tc3: formData.tc3,
          sc3: formData.sc3,
        },
      });
      alert("Problem added successfully!");
      console.log(response.data);
      setFormData({
        QuestionName: "",
        actualcode: "",
        videolink: "",
        hashtags: "",
        difficulty: "Easy",
        description: "",
        driverCode: "",
        pythonBruteForce: "",
        pythonBetter: "",
        pythonOptimized: "",
        tc1: "",
        sc1: "",
        tc2: "",
        sc2: "",
        tc3: "",
        sc3: "",
      });
    } catch (error) {
      console.error("Error adding problem:", error);
      alert("Error adding problem!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="QuestionName"
        placeholder="Question Name"
        value={formData.QuestionName}
        onChange={handleChange}
        required
      />

      <textarea
        name="actualcode"
        placeholder="Actual Code"
        value={formData.actualcode}
        onChange={handleChange}
        required
      />

      <input
        type="url"
        name="videolink"
        placeholder="Video Link"
        value={formData.videolink}
        onChange={handleChange}
      />

      <input
        type="text"
        name="hashtags"
        placeholder="Hashtags (comma-separated)"
        value={formData.hashtags}
        onChange={handleChange}
      />

      <select
        name="difficulty"
        value={formData.difficulty}
        onChange={handleChange}
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <textarea
        name="driverCode"
        placeholder="Driver Code"
        value={formData.driverCode}
        onChange={handleChange}
        required
      />

      <textarea
        name="pythonBruteForce"
        placeholder="Python Brute Force Solution"
        value={formData.pythonBruteForce}
        onChange={handleChange}
      />

      <textarea
        name="pythonBetter"
        placeholder="Python Better Solution"
        value={formData.pythonBetter}
        onChange={handleChange}
      />

      <textarea
        name="pythonOptimized"
        placeholder="Python Optimized Solution"
        value={formData.pythonOptimized}
        onChange={handleChange}
      />

      <input
        type="text"
        name="tc1"
        placeholder="Time Complexity (Brute Force)"
        value={formData.tc1}
        onChange={handleChange}
      />

      <input
        type="text"
        name="sc1"
        placeholder="Space Complexity (Brute Force)"
        value={formData.sc1}
        onChange={handleChange}
      />

      <input
        type="text"
        name="tc2"
        placeholder="Time Complexity (Better)"
        value={formData.tc2}
        onChange={handleChange}
      />

      <input
        type="text"
        name="sc2"
        placeholder="Space Complexity (Better)"
        value={formData.sc2}
        onChange={handleChange}
      />

      <input
        type="text"
        name="tc3"
        placeholder="Time Complexity (Optimized)"
        value={formData.tc3}
        onChange={handleChange}
      />

      <input
        type="text"
        name="sc3"
        placeholder="Space Complexity (Optimized)"
        value={formData.sc3}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddProblem;
