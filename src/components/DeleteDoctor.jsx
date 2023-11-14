import axios from "axios";

export const deleteDoctorById = async (doctorId) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/doctorAPI/DeleteDoctorbyId/${doctorId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default deleteDoctorById;