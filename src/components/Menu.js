import React from 'react'
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
const Menu = () => {
    const navigate = useNavigate();

    const cerrarSesionClick = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    const token = localStorage.getItem('token');
    return (
        <Navbar bg="dark" expand="md" variant="dark">
            <Container>
                <Navbar.Brand href="http://localhost:3000/">Fushibol</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {token ?
                            <>
                                <NavDropdown title="Equipo" id="basic-nav-dropdown">
                                    <Link className="dropdown-item" to="/equipos">Lista de equipos</Link>
                                    <Link className="dropdown-item" to="/equipo/create">
                                        Crear equipos
                                    </Link>
                                </NavDropdown>
                                <NavDropdown title="Evento">
                                    <Link className="dropdown-item" to="/eventos">Lista de evento</Link>
                                    <Link className="dropdown-item" to="/evento/create">
                                        Crear evento
                                    </Link>
                                </NavDropdown>
                                <NavDropdown title="Grupo">
                                    <Link className="dropdown-item" to="/grupos">Lista de grupo</Link>
                                    <Link className="dropdown-item" to="/grupo/create">
                                        Crear grupo
                                    </Link>
                                </NavDropdown>
                                <NavDropdown title="Partido">
                                    <Link className="dropdown-item" to="/partidos">Lista de partido</Link>
                                    <Link className="dropdown-item" to="/partido/create">
                                        Crear partido
                                    </Link>
                                </NavDropdown>
                                <Link className="nav-link" to="/puntuaciones">Lista de puntuacion</Link>
                                <Link className="nav-link" to="/terminados">Partidos Terminados</Link>

                                <Button onClick={cerrarSesionClick} className='nav-link btn-link'>Cerrar sesión</Button>
                            </>
                        : 
                        <>
                        <Link className="nav-link" to="/puntuaciones">Lista de puntuacion</Link>
                        <Link className="nav-link" to="/terminados">Partidos Terminados</Link>
                        <Link className="nav-link" to="/login">Iniciar sesión</Link>
                        <Link className="nav-link" to="/register">Registrar</Link>
                        </>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}

export default Menu;