import axios from 'axios';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const ListaGrupo = () => {
    const navigate = useNavigate();

    if (localStorage.getItem("token") == null) {
        navigate('/');
    }
    const [grupoList, setGrupoList] = useState([]);
    useEffect(() => {
        fetchGrupos();
    }, [])

    const fetchGrupos = () => {
        axios.get('http://localhost:8000/api/grupo', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                setGrupoList(res.data);
            }).catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    navigate('/login');
                }
            });
    }
    const eliminarGrupo = (grupo) => {
        if (!window.confirm("¿Está seguro de eliminar a " + grupo.nombre + "?")) {
            return;
        }
        axios.delete('http://localhost:8000/api/grupo/' + grupo.id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                fetchGrupos();
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
                                <h1>Lista de Grupos</h1>
                            </Card.Title>
                            <div>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Nombre</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {grupoList.map((grupo) => {
                                            return (
                                                <tr key={grupo.id}>
                                                    <td>{grupo.id}</td>
                                                    <td>{grupo.nombre}</td>
                                                    <td>
                                                        <Link className='btn btn-primary' to={"/grupos/" + grupo.id}>
                                                            Editar
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Button variant="danger" onClick={() => {
                                                            eliminarGrupo(grupo);
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
export default ListaGrupo;