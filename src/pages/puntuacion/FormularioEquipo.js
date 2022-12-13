import axios from 'axios';
import React, { useEffect, useState } from 'react' //imr
import { Button, Card, Col, Container, Form, FormControl, FormSelect, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
const FormularioEquipo = () => { //sfc
    const navigate = useNavigate();

    if (localStorage.getItem("token") == null) {
        navigate('/login');
    }
    const { id } = useParams();

    const [nombre, setNombre] = useState('');
    const [partidos_ganados, setPartidosGanados] = useState('');
    const [partidos_perdidos, setPartidosPerdidos] = useState('');
    const [partidos_empatados, setPartidosEmpatados] = useState('');
    const [goles_favor, setGolesFavor] = useState('');
    const [goles_contra, setGolesContra] = useState(false);
    const [puntos, setPuntos] = useState('');
    const [validated, setValidated] = useState(false);


    useEffect(() => {
        if (id) {
            fetchEquipoById();
        }
    }, []);

    const fetchEquipoById = () => {
        axios.get('http://localhost:8000/api/equipo/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                const equipo = res.data;
                setNombre(equipo.nombre);
                setPartidosGanados(equipo.partidos_ganados);
                setPartidosPerdidos(equipo.partidos_perdidos);
                setPartidosEmpatados(equipo.partidos_empatados);
                setGolesFavor(equipo.goles_favor);
                setGolesContra(equipo.goles_contra);
                setPuntos(equipo.puntos);

            }).catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    navigate('/login');
                }
            });
    }

    
    const saveEquipo = () => {
        const equipo = {
            "nombre": nombre,
            "partidos_ganados": partidos_ganados,
            "partidos_perdidos": partidos_perdidos,
            "partidos_empatados": partidos_empatados,
            "partidos_jugados": partidos_ganados+partidos_perdidos+partidos_empatados,
            "goles_favor": goles_favor,
            "goles_contra": goles_contra,
            "puntos": puntos
        }
        if (id) {
            doUpdate(equipo);
        } else {
            doCreate(equipo);
        }
    }
    const doUpdate = (equipo) => {
        axios.put('http://localhost:8000/api/equipo/' + id, equipo, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                navigate('/');
            }).catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    navigate('/login');
                }
            });
    }
    const doCreate = (equipo) => {
        axios.post('http://localhost:8000/api/equipo',
            equipo, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                navigate('/');
            }).catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    navigate('/login');
                }
            });
        ;
    }
    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }
        setValidated(true);
        saveEquipo();
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Card className='mt-3 mb-3'>
                        <Card.Body>
                            <Card.Title><h1>Formulario Equipo</h1></Card.Title>

                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <div>
                                    <div>
                                        <label>Nombre:</label>
                                        <input className='form-control' type="text"
                                            value={nombre} required
                                            onChange={(e) => setNombre(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es requerido
                                        </Form.Control.Feedback>
                                    </div>
                                    <div>
                                        <label>Partidos Ganados:</label>
                                        <FormControl type="number"
                                            value={partidos_ganados} required
                                            onChange={(e) => setPartidosGanados(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es requerido
                                        </Form.Control.Feedback>
                                    </div>
                                    <div>
                                        <label>Partidos Perdidos:</label>
                                        <FormControl type="number"
                                            value={partidos_perdidos} required
                                            onChange={(e) => setPartidosPerdidos(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es requerido
                                        </Form.Control.Feedback>
                                    </div>
                                    <div>
                                        <label>Partidos Empatados:</label>
                                        <FormControl type="number"
                                            value={partidos_empatados} required
                                            onChange={(e) => setPartidosEmpatados(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es requerido
                                        </Form.Control.Feedback>
                                    </div>
                                    <div>
                                        <label>Goles Favor:</label>
                                        <FormControl type="number"
                                            value={goles_favor} required
                                            onChange={(e) => setGolesFavor(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es requerido
                                        </Form.Control.Feedback>
                                    </div>
                                    <div>
                                        <label>Goles Contra:</label>
                                        <FormControl type="number"
                                            value={goles_contra} required
                                            onChange={(e) => setGolesContra(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es requerido
                                        </Form.Control.Feedback>
                                    </div>
                                    <div>
                                        <label>Puntos:</label>
                                        <FormControl type="number"
                                            value={puntos} required
                                            onChange={(e) => setPuntos(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es requerido
                                        </Form.Control.Feedback>
                                    </div>
                                    <div>
                                        <Button className='mt-2' type="submit">Guardar</Button>
                                    </div>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
export default FormularioEquipo;