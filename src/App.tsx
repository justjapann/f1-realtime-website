import React from "react";
import { Routes, Route } from "react-router-dom";
import NoPage from "./pages/noPage/noPage";
import Home from "./pages/home/home";
import "./App.css";

export function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}
