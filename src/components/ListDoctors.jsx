import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllDoctorsRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { deleteDoctorById } from "./DeleteDoctor";
import Home from './Home';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

export const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [foundMed, setFoundMed] = useState([]);

  useEffect(() => {
    filterDoctors();
  }, [name, specialization]);

  const filterDoctors = () => {
    const results = doctors.filter((doctor) => {
      const nameMatch = doctor.name.toLowerCase().includes(name.toLowerCase());
      const specializationMatch = doctor.specialization
        .toLowerCase()
        .includes(specialization.toLowerCase());
      return nameMatch && specializationMatch;
    });
    setFoundMed(results);
  };

  const handleFilterChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "specialization") {
      setSpecialization(e.target.value);
    }
  };

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(getAllDoctorsRoute);
      setDoctors(response.data);
      setFoundMed(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sendEditID = (doctor_id) => {
    navigate("/editmed", { state: { doctor: doctor_id } });
  };

  const sendDocID = (doctor_id) => {
    navigate("/doctorDetails", { state: { doctorId: doctor_id } });
  };

  const handleDeleteDoctor = async (doctorId) => {
    try {
      await deleteDoctorById(doctorId);
      setFoundMed((prevFoundMed) =>
        prevFoundMed.filter((doctor) => doctor._id !== doctorId)
      );
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  return (
    <div>
      <h2>List of Doctors</h2>
      <Form.Control
        type="search"
        name="name"
        value={name}
        onChange={handleFilterChange}
        className="input"
        placeholder="Nombre del médico"
      />

      <Form.Control
        as="select"
        name="specialization"
        value={specialization}
        onChange={handleFilterChange}
        className="input"
        placeholder="Especialización">
        <option value="">All Specializations</option>
        {doctors.map((doctor) => (
          <option key={doctor._id} value={doctor.specialization}>
            {doctor.specialization}
          </option>
        ))}
      </Form.Control>

      <ListGroup as="ul">
        {foundMed && foundMed.length > 0 ? (
          foundMed.map((doctor) => (
            <ListGroup.Item as="li" key={doctor._id}>
              <img
                src={doctor.avatarImage}
                alt={`${doctor.name}'s avatar`}
                width="50"
                height="50"
              />
              {doctor.name}, {doctor.specialization}, {doctor.experience} of
              experience.
              <Button
                className="ListButton"
                onClick={() => sendEditID(doctor._id)}>
                Editar
              </Button>
              <Button
                className="ListButton"
                onClick={() => handleDeleteDoctor(doctor._id)}>
                Borrar
              </Button>
              <Button
                className="ListButton"
                onClick={() => sendDocID(doctor._id)}>
                Ver detalles
              </Button>
            </ListGroup.Item>
          ))
        ) : (
          <div>
            <a>No se encuentran resultados</a>
          </div>
        )}
      </ListGroup>
    </div>
  );
}

export default DoctorList;