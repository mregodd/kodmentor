import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditMentor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [expertise, setExpertise] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchMentor = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/mentors/${id}`);
      const mentorToEdit = response.data;
      setName(mentorToEdit.name);
      setExpertise(mentorToEdit.expertise);
      setLinkedin(mentorToEdit.linkedin || "");
    } catch (err) {
      console.error("Error fetching mentor for edit:", err);
      setError("Failed to load mentor data.");
    } finally {
      setLoading(false);
    }
  };
  fetchMentor();
}, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !expertise.trim()) {
      setError("Name and expertise are required.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/mentors/${id}`, {
        name: name.trim(),
        expertise: expertise.trim(),
        linkedin: linkedin.trim(),
      });
      navigate("/");
    } catch (err) {
      console.error("Error updating mentor:", err);
      setError("Failed to update mentor. Please try again.");
    }
  };

  if (loading) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        Loading mentor data...
      </p>
    );
  }

  if (error) {
    return (
      <p style={{ color: "red", textAlign: "center", marginTop: "2rem" }}>
        {error}
      </p>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        Edit Mentor
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          borderRadius: "4px",
        }}
      >
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div style={{ marginBottom: "0.5rem" }}>
          <label style={{ display: "block", fontWeight: "bold" }}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #aaa",
            }}
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label style={{ display: "block", fontWeight: "bold" }}>
            Expertise:
          </label>
          <input
            type="text"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #aaa",
            }}
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label style={{ display: "block", fontWeight: "bold" }}>
            LinkedIn URL (optional):
          </label>
          <input
            type="text"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #aaa",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#27ae60",
            color: "#fff",
            padding: "0.6rem 1.2rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "1rem",
          }}
        >
          Update Mentor
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#95a5a6",
            color: "#fff",
            padding: "0.6rem 1.2rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditMentor;
