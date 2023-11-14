import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import { updateDoctor } from '../utils/APIRoutes';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FileBase64 from 'react-file-base64';
import { useNavigate } from 'react-router-dom';

export const EditMed = (doctor) => {
  const location = useLocation();
  const navigateTo = useNavigate();

  const [editedMed, setEditedMed] = useState({ ...doctor });
  const [image, setImage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMed({
      ...editedMed,
      [name]: value,
    });
  };

  //console.log({name, email, specialization, experience});
  const handleSave = async () => {
    try {
      if (image.trim()) {
        editedMed.avatarImage = image;
      }
      const response = await axios.put(`${updateDoctor}/${location.state.doctor}`, editedMed);
      console.log("Datos del medico actualizados: ", response.data);
      navigateTo("/doctorDetails", { state: { doctorId: response.data._id } });
    } catch (error) {
      console.error('Error al actualizar los datos del medico: ', error);
    }
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control name="name" value={editedMed.name} onChange={handleChange} type="text" placeholder="Ingresa el nuevo nombre" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Especialización</Form.Label>
          <Form.Control name="specialization" value={editedMed.specialization} onChange={handleChange} type="text" placeholder="Ingresa la especialización" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Experiencia</Form.Label>
          <Form.Control name="experience" value={editedMed.experience} onChange={handleChange} type="text" placeholder="Ingresa experiencia" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" value={editedMed.email} onChange={handleChange} type="email" placeholder="Ingresa el nuevo nombre" />
        </Form.Group>
      </Form>
      <Form.Group className="mb-3">
        <Form.Label>Imagen de perfil</Form.Label>
        <br />
        <FileBase64
          multiple={false}
          onDone={(files) => {
            const imageBase64 = files.base64;
            setImage(imageBase64);
          }}
        />
      </Form.Group>
      <Button onClick={handleSave}>Guardar</Button>
    </div>
  );
};

export default EditMed;