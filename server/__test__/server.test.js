import app from '../app';
import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('API test', () => {

    test('It should response with 200 status code from GET /ping', async () => {
        const response = await request(app).get('/ping').send();
        expect(response.statusCode).toBe(200);
    });

    test("test api post", async () => {
        const response = await request(app).post("/test").send({});
        expect(response.statusCode).toBe(200);
    });
    
    // test('It should response with 201 status code from /doctorAPI/doctorRegister', async () => {
    //     const response = await request(app)
    //         .post('/doctorAPI/doctorRegister/')
    //         .send({
    //             name: 'John Doe',
    //             email: 'johndoe@example.com',
    //             password: 'password123',
    //             specialization: 'Cardiologist',
    //             experience: '5 years'
    //         });

    //     // Verifica que la respuesta tenga un código de estado 201
    //     expect(response.status).toBe(201);
    // });

    test('It should response with 200 status code from /doctorAPI/getDoctorbyName, partial name', async () => {
        const name = "John"
        const response = await request(app)
            .get('/doctorAPI/getDoctorbyName/' + name)
            .send();

        // Verifica que la respuesta tenga un código de estado 200
        expect(response.status).toBe(200);
    });

    test('It should response with 200 status code from /doctorAPI/getDoctorbyName, Full name', async () => {
        const name = "pepe masias"
        const response = await request(app)
            .get('/doctorAPI/getDoctorbyName/' + name)
            .send();

        // Verifica que la respuesta tenga un código de estado 200
        expect(response.status).toBe(200);
    });

    test('It should response with a json from /doctorAPI/getDoctorbyName, Full name', async () => {
        const name = "pepe masias"
        const response = await request(app)
            .get('/doctorAPI/getDoctorbyName/' + name)
            .send();

        // Verifica que la respuesta es un json
        expect(response.type).toBe('application/json');
    });

    test('It should response with a json from /doctorAPI/getDoctorbyName, partial name', async () => {
        const name = "John"
        const response = await request(app)
            .get('/doctorAPI/getDoctorbyName/' + name)
            .send();

        // Verifica que la respuesta es un json
        expect(response.type).toBe('application/json');
    });

    test("It should response with 200 status code from /doctorAPI/getAllDoctors", async () => {
        const response = await request(app)
            .get("/doctorAPI/getAllDoctors")
            .send();

        expect(response.status).toBe(200);
    });

    test("It should response with 200 status code from /doctorAPI/UpdateDoctorbyId", async () => {
        const response = await request(app)
            .put("/doctorAPI/UpdateDoctorbyId/651ceefa78da9f80b0651e5d")
            .send({
                name: "John Doe",
                email: "jhon.doe2@a.com",
                specialization: "Traumatologist",
            });
        expect(response.status).toBe(200);
    });

    test("It should response with 200 status code from /doctorAPI/getDoctorbyId", async () => {
        const response = await request(app)
            .get("/doctorAPI/getDoctorbyId/651ceefa78da9f80b0651e5d")
            .send();
        expect(response.status).toBe(200);
    });

    test("Have a 400 status code from /doctorAPI/doctorRegister passing a name whit numbers", async () => {
        const response = await request(app)
            .post("/doctorAPI/doctorRegister")
            .send({
                name: "John Doe 2",
                email: "a@a.com",
                password: "12345678",
                specialization: "Traumatologist",
                experience: "5 years"
            });
        expect(response.body.status).toBe(400);
    });

    test("Have a 400 status code from /doctorAPI/doctorRegister with a password of 7 characters", async () => {
        const response = await request(app)
            .post("/doctorAPI/doctorRegister")
            .send({
                name: "John Does",
                email: "b@a.com",
                password: "1234567",
                specialization: "Traumatologist",
                experience: "5 years"
            });
        expect(response.body.status).toBe(400);
    });

    test("Have a 400 status code from /doctorAPI/doctorRegister with a password of 8 characters", async () => {
        const response = await request(app)
            .post("/doctorAPI/doctorRegister")
            .send({
                name: "John Doess",
                email: "b1@a.com",
                password: "1234568",
                specialization: "Traumatologist",
                experience: "5 years"
            });
        expect(response.body.status).toBe(400);
    });

    test("Have a 200 status code from /doctorAPI/doctorDeleteById", async () => {
        const response = await request(app)
            .delete("/doctorAPI/DeleteDoctorbyId/651cc9a054178f413124dc8c")
            .send();
        expect(response.status).toBe(200);
    });

    test("Have a 400 status code from /doctorAPI/doctorRegister with a invalid email, only a string", async () => {
        const response = await request(app)
            .post("/doctorAPI/doctorRegister")
            .send({
                name: "John Does",
                email: "a",
                password: "12345678",
                specialization: "Traumatologist",
                experience: "5 years"
            });
    });

    test("Have a 400 status code from /doctorAPI/doctorRegister with a invalid email, string without .com", async () => {
        const response = await request(app)
            .post("/doctorAPI/doctorRegister")
            .send({
                name: "John Does",
                email: "a@q",
                password: "12345678",
                specialization: "Traumatologist",
                experience: "5 years"
            });
    });

    test("Have a 400 status code from /doctorAPI/doctorRegister with a invalid email, string without @", async () => {
        const response = await request(app)
            .post("/doctorAPI/doctorRegister")
            .send({
                name: "John Does",
                email: "a.com",
                password: "12345678",
                specialization: "Traumatologist",
                experience: "5 years"
            });
    });
})