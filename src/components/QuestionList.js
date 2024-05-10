import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: "",
  });

  useEffect(() => {
    // Fetch questions data when the component mounts
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      // Fetch questions from the provided endpoint
      const response = await fetch("http://localhost:4000/questions");
      const data = await response.json();
      // Update state with the fetched questions
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to add the new question
      const response = await fetch("http://localhost:4000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      });
      if (response.ok) {
        // If the request is successful, fetch updated questions
        fetchQuestions();
        // Reset the newQuestion state
        setNewQuestion({
          prompt: "",
          answer1: "",
          answer2: "",
          answer3: "",
          answer4: "",
          correctIndex: "",
        });
      } else {
        console.error("Failed to add new question");
      }
    } catch (error) {
      console.error("Error adding new question:", error);
    }
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* Map over questions and render QuestionItem components */}
        {questions.map((question) => (
          <QuestionItem key={question.id} question={question} />
        ))}
      </ul>
      {/* Form for creating a new question */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="prompt"
          value={newQuestion.prompt}
          onChange={handleInputChange}
          placeholder="Question Prompt"
          required
        />
        <input
          type="text"
          name="answer1"
          value={newQuestion.answer1}
          onChange={handleInputChange}
          placeholder="Answer 1"
          required
        />
        <input
          type="text"
          name="answer2"
          value={newQuestion.answer2}
          onChange={handleInputChange}
          placeholder="Answer 2"
          required
        />
        <input
          type="text"
          name="answer3"
          value={newQuestion.answer3}
          onChange={handleInputChange}
          placeholder="Answer 3"
        />
        <input
          type="text"
          name="answer4"
          value={newQuestion.answer4}
          onChange={handleInputChange}
          placeholder="Answer 4"
        />
        <select
          name="correctIndex"
          value={newQuestion.correctIndex}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Correct Answer</option>
          <option value="1">Answer 1</option>
          <option value="2">Answer 2</option>
          <option value="3">Answer 3</option>
          <option value="4">Answer 4</option>
        </select>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionList;
