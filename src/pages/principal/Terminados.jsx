import axios from 'axios';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import FotoPerfil from '../../components/FotoPerfil';

let timeoutActual = null;
const actualizarDatos = (doUpdate)=>{
    if(timeoutActual != null){
        clearTimeout(timeoutActual);
        timeoutActual = null;
    }
    doUpdate().finally(()=>{
        timeoutActual = setTimeout(()=>{
            actualizarDatos(doUpdate);
        }, 10000);
    });
}
const Terminados = () => {
    const navigate = useNavigate();

    const [partidosList, setPartidosList] = useState([]);
    useEffect(() => {
        actualizarDatos(fetchPartidos);
    }, [])

    const fetchPartidos = () => {
        return axios.get('http://localhost:8000/api/partido/terminados', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => {
            setPartidosList(res.data);
        }).catch(err => {
            console.log(err);
            if(err.response.status === 401){
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
                                <h1>Partido terminados</h1>
                            </Card.Title>
                            <div>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Inicio</th>
                                            <th>Id Equipo 1</th>
                                            <th>Foto 1</th>
                                            <th>Marcador 1</th>
                                            <th>Eventos 1</th>
                                            <th>Id Equipo 2</th>
                                            <th>Foto 2</th>
                                            <th>Marcador 2</th>
                                            <th>Eventos 2</th>
                                            <th>Final</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {partidosList.map((partido) => {
                                            return (
                                                <tr key={partido.id}>

                                                    <td>{partido.inicio}</td>
                                                    <td>{partido.equipo1_id}</td>
                                                    <td>
                                                    <FotoPerfil x={partido.equipo1_id} />
                                                    </td>
                                                    <td>{partido.marcador_equipo1}</td>
                                                    <td>
                                                        
                                                    </td>
                                                    <td>{partido.equipo2_id}</td>
                                                    <td>
                                                    <FotoPerfil x={partido.equipo2_id} />
                                                    </td>
                                                    <td>{partido.marcador_equipo2}</td>
                                                    <td>
                                                        
                                                    </td>
                                                    <td>{partido.final}</td>
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
export default Terminados;