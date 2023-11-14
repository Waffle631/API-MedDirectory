import React from "react";
import { useLoadScript } from '@react-google-maps/api';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import home from '../assets/home.svg';
import '../styles/navbar.css';
import Clinics from './Clinics';

export const NavBar = () => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ['places']
    });

    const renderClinics = () => {
        if (!isLoaded) return <div>'Loading...'</div>;
        return (
            <Clinics />
        )
    }

    return (
        <>
            <Navbar bg='light' data-bs-theme='light'>
                <Container>
                    <Navbar.Brand href='/'>
                        <img src={home} alt='logo'></img>
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link href='/'>Home</Nav.Link>
                        <Nav.Link href='/list'>Lista de médicos</Nav.Link>
                        <Nav.Link href='/addDoctor'>Añadir médico</Nav.Link>
                        {renderClinics()}
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar;