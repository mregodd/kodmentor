import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditMentor from "./pages/EditMentor";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<EditMentor />} />
      </Routes>
    </div>
  );
}

export default App;
