import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import EditMed from "./components/EditMed";
import List from "./components/ListDoctors";
import NavBar from "./components/NavBar";
import AddDoctor from "./components/AddDoctor";
import DeleteDoctorById from "./components/DeleteDoctor";
import DoctorDetails from "./components/DoctorDetails";

export default function App() {

  return (
    <>
      <BrowserRouter>
      <NavBar />
      <h1>Directorio Médic</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editmed" element={<EditMed />} />
        <Route path="/list" element={<List />} />
        <Route path="/addDoctor" element={<AddDoctor />} />
        <Route path="/deleteDoctor" element={<DeleteDoctorById />} />
        <Route path="/doctorDetails" element={<DoctorDetails />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}