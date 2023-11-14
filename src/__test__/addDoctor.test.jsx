// src/__tests__/App.test.tsx
import { screen, render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { AddDoctor } from '../components/AddDoctor';

describe("App", () => {
    test("prueba para envio de formulario", () => {

        const testData = { 
            name: "test test", 
            email: "test@test.com", 
            password: "test123456", 
            specialization: "testSpe", 
            experience: "testExp"}

        render(<AddDoctor />);

        const inputName = screen.getByPlaceholderText(/Name/i);
        const inputEmail = screen.getByPlaceholderText(/Email/i);
        const inputPass = screen.getByPlaceholderText(/Password/i);
        const inputSpe = screen.getByPlaceholderText(/Specialization/i);
        const inputExp = screen.getByPlaceholderText(/Experience/i);
        const button = screen.getByRole("button", { name: /Register Doctor/i });
        let succes = screen.queryByText(/registro fue exitoso/i);

        expect(succes).not.toBeInTheDocument();

        // user.clear(inputName);
        // user.type(inputName, testData.name);
        // user.clear(inputEmail);
        // user.type(inputEmail, testData.email);
        // user.clear(inputPass);
        // user.type(inputPass, testData.password);
        // user.clear(inputSpe);
        // user.type(inputSpe, testData.specialization);
        // user.clear(inputExp);
        // user.type(inputExp, testData.experience);
        // user.click(button);

        // succes = screen.queryByText(/registro fue exitoso/i);
        // expect(succes).toBeInTheDocument();

    });
});