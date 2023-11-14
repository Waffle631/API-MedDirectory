import Doctors from '../model/doctorModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

function HaveNumbers(string) {
    return /\d/.test(string);
};

function MinLenght(str, min) {
    return str.length >= min;
};

function esCorreoElectronicoValido(correo) {
    // Expresión regular para verificar si el correo tiene la estructura correcta
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(correo);
};

// Register a new doctor and return a token
const doctorRegister = async (req, res, next) => {
    try {
        const { name, email, password, specialization, experience, avatarImage} = req.body;
        const emailCheck = await Doctors.findOne({ email });
        if (emailCheck) {
            return res.json({ message: 'Email already exists', status: 400 });
        };
        if(HaveNumbers(name)){
            return res.json({ message: 'Name cannot contain numbers', status: 400 });
        };
        if(!MinLenght(password, 8)){
            return res.json({ message: 'Password must be at least 8 characters long', status: 400 });
        };
        if(!esCorreoElectronicoValido(email)){
            return res.json({ message: 'Invalid email', status: 400 });
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        const doctor = await Doctors.create({
            name,
            email,
            password: hashedPassword,
            specialization,
            experience,
            avatarImage
        });
        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.status(201).json({ token });
    } catch (error) {
        next(error);
    };
};

// Login a registered doctor
const doctorLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctor.findOne({ email });
        if (!doctor) {
            return res.json({ message: 'Email does not exist', status: 400 });
        }
        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.json({ message: 'Incorrect password', status: 400 });
        }
        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.json({ token });
    } catch (error) {
        next(error);
    };
};

const getAllDoctors = async (req, res, next) => {
    try {
        const doctors = await Doctors.find().select([
            "name", "specialization", "experience", "avatarImage", "email",
        ]);
        return res.status(200).json(doctors);
    } catch (error) {
        next(error);
    };
};

const getDoctorbyName = async (req, res, next) => {
    const name = req.params.name;
    if(HaveNumbers(name)){
        return res.json({ message: 'Name cannot contain numbers', status: 400 });
    }
    try {
        const doctor = await Doctors.findOne({ name: name }).select([
            "name", "specialization", "experience", "avatarImage", "email"
        ]);
        return res.status(200).json(doctor);
    } catch (error) {
        next(error);
    };
};

const getDoctorbyId = async (req, res, next) => {
    const doctorId = req.params.id;
    try {
        const doctor = await Doctors.findById(doctorId).select([
            "name", "specialization", "experience", "avatarImage", "email"
        ]);
        return res.status(200).json(doctor);
    } catch (error) {
        next(error);
    };
};

const UpdateDoctorbyId = async (req, res, next) => {
    try {
        const doctorId = req.params.id;
        const body = req.body;
        if(body.name && HaveNumbers(body.name)){
            return res.json({ message: 'Name cannot contain numbers', status: 400 });
        }
        if(body.email && !esCorreoElectronicoValido(body.email)){
            return res.json({ message: 'Invalid email', status: 400 });
        }
        const doctor = await Doctors.findByIdAndUpdate(doctorId, body, { new: true });
        return res.status(200).json(doctor);
    } catch (error) {
        next(error);
    }
};

//hacer delete del doctor
const DeleteDoctorbyId = async (req, res, next) => {
    try {
        const doctorId = req.params.id;
        const doctor = await Doctors.findByIdAndDelete(doctorId);
        return res.status(200).json(doctor);
    } catch (error) {
        next(error);
    }
};

export { doctorRegister, doctorLogin, getAllDoctors, getDoctorbyName, getDoctorbyId, UpdateDoctorbyId, DeleteDoctorbyId };