import mongoose from 'mongoose';
const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique:true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    avatarImage: {
        type: String,
        default: ''
    },
    specialization: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    }
});

export default mongoose.model('Doctors', doctorSchema);