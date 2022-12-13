import axios from 'axios';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const ListaPartidos = () => {
    const navigate = useNavigate();

    if (localStorage.getItem("token") == null) {
        navigate('/');
    }
    const [partidoList, setPartidoList] = useState([]);
    const [puntos, setPuntos] = useState([]);

    useEffect(() => {
        fetchPartidos();
    }, [])

    const fetchPartidos = () => {
        axios.get('http://localhost:8000/api/partido', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                setPartidoList(res.data);
            }).catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    navigate('/login');
                }
            });
    }
    const fetchPunto = (id) => {
        axios.get('http://localhost:8000/api/partido',id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                setPuntos(res.data);
            }).catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    navigate('/login');
                }
            });
    }
    const eliminarPartido = (partido) => {
        if (!window.confirm("¿Está seguro de eliminar a " + partido.nombre + "?")) {
            return;
        }
        eliminarPuntos(partido);
        axios.delete('http://localhost:8000/api/partido/' + partido.id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                fetchPartidos();
            }).catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    navigate('/login');
                }
            });
    }

    const eliminarPuntos = (partido) => {
        console.log(partido);
        if (partido.estado == 0 && partido.final > 0) {
            if (partido.marcador_equipo1 == partido.marcador_equipo2) {
                fetchPunto(partido.equipo1_id); 
                const puntos1 = {
                    "id_equipo": puntos.id_equipo,
                    "partidos_ganados": puntos.partidos_ganados,
                    "partidos_perdidos": puntos.partidos_perdidos,
                    "partidos_emptados": puntos.partidos_emptados - 1,
                    "partidos_jugados": puntos.partidos_jugados - 1,
                    "goles_favor": puntos.goles_favor - partido.marcador_equipo1,
                    "goles_contra": puntos.goles_contra - partido.marcador_equipo2,
                    "puntos": puntos.puntos - 1
                }
                axios.put('http://localhost:8000/api/puntuacion/' + partido.equipo1_id, puntos1, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(res => {
                        fetchPartidos();
                    }).catch(err => {
                        console.log(err);
                        if (err.response.status === 401) {
                            navigate('/login');
                        }
                    });
                    fetchPunto(partido.equipo2_id);
                const puntos2 = {
                    "id_equipo": puntos.id_equipo,
                    "partidos_ganados": puntos.partidos_ganados,
                    "partidos_perdidos": puntos.partidos_perdidos,
                    "partidos_emptados": puntos.partidos_emptados - 1,
                    "partidos_jugados": puntos.partidos_jugados - 1,
                    "goles_favor": puntos.goles_favor - partido.marcador_equipo2,
                    "goles_contra": puntos.goles_contra - partido.marcador_equipo1,
                    "puntos": puntos.puntos - 1
                }
                axios.put('http://localhost:8000/api/puntuacion/' + partido.equipo2_id, puntos2, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(res => {
                        fetchPartidos();
                    }).catch(err => {
                        console.log(err);
                        if (err.response.status === 401) {
                            navigate('/login');
                        }
                    });
            } else if (partido.marcador_equipo1 > partido.marcador_equipo2) {
                fetchPunto(partido.equipo1_id);
                const puntos1 = {
                    "id_equipo": puntos.id_equipo,
                    "partidos_ganados": puntos.partidos_ganados - 1,
                    "partidos_perdidos": puntos.partidos_perdidos,
                    "partidos_emptados": puntos.partidos_emptados,
                    "partidos_jugados": puntos.partidos_jugados - 1,
                    "goles_favor": puntos.goles_favor - partido.marcador_equipo1,
                    "goles_contra": puntos.goles_contra - partido.marcador_equipo2,
                    "puntos": puntos.puntos - 3
                }
                axios.put('http://localhost:8000/api/puntuacion/' + partido.equipo1_id, puntos1, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(res => {
                        fetchPartidos();
                    }).catch(err => {
                        console.log(err);
                        if (err.response.status === 401) {
                            navigate('/login');
                        }
                    });
                    fetchPunto(partido.equipo2_id);
                const puntos2 = {
                    "id_equipo": puntos.id_equipo,
                    "partidos_ganados": puntos.partidos_perdidos,
                    "partidos_perdidos": puntos.partidos_perdidos - 1,
                    "partidos_emptados": puntos.partidos_emptados,
                    "partidos_jugados": puntos.partidos_jugados - 1,
                    "goles_favor": puntos.goles_favor - partido.marcador_equipo2,
                    "goles_contra": puntos.goles_contra - partido.marcador_equipo1
                }
                axios.put('http://localhost:8000/api/puntuacion/' + partido.equipo2_id, puntos2, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(res => {
                        fetchPartidos();
                    }).catch(err => {
                        console.log(err);
                        if (err.response.status === 401) {
                            navigate('/login');
                        }
                    });
            } else {
                fetchPunto(partido.equipo1_id);
                const puntos1 = {
                    "id_equipo": puntos.id_equipo,
                    "partidos_ganados": puntos.partidos_perdidos,
                    "partidos_perdidos": puntos.partidos_perdidos - 1,
                    "partidos_emptados": puntos.partidos_emptados,
                    "partidos_jugados": puntos.partidos_jugados - 1,
                    "goles_favor": puntos.goles_favor - partido.marcador_equipo1,
                    "goles_contra": puntos.goles_contra - partido.marcador_equipo2
                }
                axios.put('http://localhost:8000/api/puntuacion/' + partido.equipo1_id, puntos1, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(res => {
                        fetchPartidos();
                    }).catch(err => {
                        console.log(err);
                        if (err.response.status === 401) {
                            navigate('/login');
                        }
                    });
                    fetchPunto(partido.equipo2_id);
                const puntos2 = {
                    "id_equipo": puntos.id_equipo,
                    "partidos_ganados": puntos.partidos_ganados - 1,
                    "partidos_perdidos": puntos.partidos_perdidos,
                    "partidos_emptados": puntos.partidos_emptados,
                    "partidos_jugados": puntos.partidos_jugados - 1,
                    "goles_favor": puntos.goles_favor - partido.marcador_equipo2,
                    "goles_contra": puntos.goles_contra - partido.marcador_equipo1,
                    "puntos": puntos.puntos - 3
                }
                axios.put('http://localhost:8000/api/puntuacion/' + partido.equipo2_id, puntos2, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(res => {
                        fetchPartidos();
                    }).catch(err => {
                        console.log(err);
                        if (err.response.status === 401) {
                            navigate('/login');
                        }
                    });
            }
        }
    }
    return (
        <Container>
            <Row>
                <Col>
                    <Card className='mt-3 mb-3'>
                        <Card.Body>
                            <Card.Title>
                                <h1>Lista de Partidos</h1>
                            </Card.Title>
                            <div>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Equipo1</th>
                                            <th>Equipo2</th>
                                            <th>Inicio</th>
                                            <th>Final</th>
                                            <th>Marcador Equipo1</th>
                                            <th>Marcador Equipo2</th>
                                            <th>Estado</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {partidoList.map((partido) => {
                                            return (
                                                <tr key={partido.id}>
                                                    <td>{partido.id}</td>
                                                    <td>{partido.equipo1_id}</td>
                                                    <td>{partido.equipo2_id}</td>
                                                    <td>{partido.inicio}</td>
                                                    <td>{partido.final}</td>
                                                    <td>{partido.marcador_equipo1}</td>
                                                    <td>{partido.marcador_equipo2}</td>
                                                    <td>{partido.estado}</td>
                                                    <td>
                                                        <Link className='btn btn-primary' to={"/partidos/" + partido.id}>
                                                            Editar
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Button variant="danger" onClick={() => {
                                                            eliminarPartido(partido);
                                                        }}>
                                                            Eliminar
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
export default ListaPartidos;