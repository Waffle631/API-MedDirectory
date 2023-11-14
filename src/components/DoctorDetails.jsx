import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { getDoctorByIdRoute } from "../utils/APIRoutes";

export const DoctorDetails = () => {
    const location = useLocation();
    const doctorId = location.state && location.state.doctorId;
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (doctorId) {
                    console.log("doctorId:", doctorId)
                    const response = await axios.get(`${getDoctorByIdRoute}/${doctorId}`);
                    setDoctor(response.data);
                }
            } catch (error) {
                console.error("Error fetching doctor details:", error);
            }
        };

        fetchData();
    }, [doctorId]);

    return (
        <div>
            {doctor ? (
                <div>
                    <h2>Doctor Details</h2>
                    <p>Name: {doctor.name}</p>
                    <p>Specialization: {doctor.specialization}</p>
                    <p>Experience: {doctor.experience}</p>
                    <p>Email: {doctor.email}</p>
                    {doctor.avatarImage && (
                        <img
                            src={doctor.avatarImage}
                            alt={`${doctor.name}'s avatar`}
                            style={{ maxWidth: "200px" }}
                        />
                    )}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default DoctorDetails;