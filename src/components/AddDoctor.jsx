import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FileBase64 from 'react-file-base64';

export const AddDoctor = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        specialization: "",
        experience: "",
    });

    const [errors, setErrors] = useState({});
    const [image, setImage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const errors = {};

        // Email validation (simple pattern, you can improve it)
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Invalid email address";
        }

        // Password validation (minimum length, you can add more rules)
        if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        // Name validation (not empty)
        if (!formData.name.trim()) {
            errors.name = "Name is required";
            console.log("Name is required")
        }

        // Specialization validation (not empty)
        if (!formData.specialization.trim()) {
            errors.specialization = "Specialization is required";
            console.log("Specialization is required")
        }

        // Experience validation (not empty)
        if (!formData.experience.trim()) {
            errors.experience = "Experience is required";
            console.log("Experience is required")
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const navigateTo = useNavigate();

        if (validateForm()) {
            try {
                console.log("Form data:", formData)
                const response = await axios.post(
                    "http://localhost:5000/doctorAPI/doctorRegister",
                    {
                        ...formData,
                        avatarImage: image,
                    }
                );
                console.log("Doctor registration successful:", response.data);
                navigateTo('/list');
            } catch (error) {
                console.error("Error registering doctor:", error);
            }
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                {errors.email && <span className="error">{errors.email}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                {errors.password && <span className="error">{errors.password}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Specialization</Form.Label>
                <Form.Control type="text" id="specialization" name="specialization" value={formData.specialization} onChange={handleChange} placeholder="Specialization" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Experience</Form.Label>
                <Form.Control type="text" id="experience" name="experience" value={formData.experience} onChange={handleChange} placeholder="Experience" />
            </Form.Group>

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

            <Button type="submit">Register doctor</Button>
        </Form>
    );
};

export default AddDoctor;