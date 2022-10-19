import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  EmployeeManagement,
} from "pages";

const ScreensRoot = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employee-management" element={<EmployeeManagement />} />
    </Routes>
  );
};

export default ScreensRoot;
