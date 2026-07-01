import React from "react";
import { Route, Routes } from "react-router";
import Login from "./Features/Auth/Login";
import Register from "./Features/Auth/Register";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Root Page</h1>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/second" element={<h1>second Page</h1>} />
    </Routes>
  );
};

export default App;
