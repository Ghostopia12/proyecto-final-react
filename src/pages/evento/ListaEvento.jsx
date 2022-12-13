import axios from 'axios';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const ListaEventos = () => {
    const navigate = useNavigate();

    if (localStorage.getItem("token") == null) {
        navigate('/');
    }
    const [eventoList, setEventoList] = useState([]);
    useEffect(() => {
        fetchEventos();
    }, [])

    const fetchEventos = () => {
        axios.get('http://localhost:8000/api/evento', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                setEventoList(res.data);
            }).catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    navigate('/login');
                }
            });
    }
    const eliminarEvento = (evento) => {
        if (!window.confirm("¿Está seguro de eliminar a " + evento.nombre + "?")) {
            return;
        }
        axios.delete('http://localhost:8000/api/evento/' + evento.id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                fetchEventos();
            }).catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    navigate('/login');
                }
            });
    }
    return (
        <Container>
            <Row>
                <Col>
                    <Card className='mt-3 mb-3'>
                        <Card.Body>
                            <Card.Title>
                                <h1>Lista de Eventos</h1>
                            </Card.Title>
                            <div>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Partido</th>
                                            <th>Equipo</th>
                                            <th>Minuto</th>
                                            <th>Final</th>
                                            <th>Descripcion</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {eventoList.map((evento) => {
                                            return (
                                                <tr key={evento.id}>
                                                    <td>{evento.id}</td>
                                                    <td>{evento.partido_id}</td>
                                                    <td>{evento.equipo_id}</td>
                                                    <td>{evento.minuto}</td>
                                                    <td>{evento.descripcion}</td>
                                                    <td>
                                                        <Link className='btn btn-primary' to={"/eventos/" + evento.id}>
                                                            Editar
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Button variant="danger" onClick={() => {
                                                            eliminarEvento(evento);
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
export default ListaEventos;