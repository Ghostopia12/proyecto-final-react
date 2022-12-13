import axios from 'axios';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import FotoPerfil from '../../components/FotoPerfil';

const ListaEquipos = () => {
    const navigate = useNavigate();

    if (localStorage.getItem("token") == null) {
        navigate('/');
    }
    const [equipoList, setEquipoList] = useState([]);
    useEffect(() => {
        fetchEquipos();
    }, [])

    const fetchEquipos = () => {
        axios.get('http://localhost:8000/api/equipo', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                setEquipoList(res.data);
            }).catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    navigate('/login');
                }
            });
    }
    const eliminarEquipo = (equipo) => {
        if (!window.confirm("¿Está seguro de eliminar a " + equipo.nombre + "?")) {
            return;
        }
        axios.delete('http://localhost:8000/api/equipo/' + equipo.id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                fetchEquipos();
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
                                <h1>Lista de Equipos</h1>
                            </Card.Title>
                            <div>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Foto</th>
                                            <th>Id</th>
                                            <th>Nombre</th>
                                            <th>Grupo</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {equipoList.map((equipo) => {
                                            return (
                                                <tr key={equipo.id}>
                                                    <td>
                                                        <FotoPerfil x ={equipo.id}/>
                                                    </td>
                                                    <td>{equipo.id}</td>
                                                    <td>{equipo.nombre}</td>
                                                    <td>
                                                        {equipo.grupo && <>
                                                            {equipo.grupo.nombre}
                                                        </>
                                                        }
                                                    </td> 
                                                    <td>
                                                        <Link className='btn btn-primary' to={"/equipos/" + equipo.id}>
                                                            Editar
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link className='btn btn-secondary' to={"/equipos/" + equipo.id + "/foto"}>
                                                            Subir foto
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Button variant="danger" onClick={() => {
                                                            eliminarEquipo(equipo);
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
export default ListaEquipos;