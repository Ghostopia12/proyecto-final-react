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
const Puntaje = () => {
    const navigate = useNavigate();

    const [puntajesList, setPuntajesList] = useState([]);
    useEffect(() => {
        actualizarDatos(fetchPuntajes);
    }, [])

    const fetchPuntajes = () => {
        return axios.get('http://localhost:8000/api/puntuacion', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => {
            setPuntajesList(res.data);
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
                                <h1>Puntaje en curso</h1>
                            </Card.Title>
                            <div>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Foto</th>
                                            <th>Equipo</th>
                                            <th>Puntajes Ganados</th>
                                            <th>Puntajes Perdidos</th>
                                            <th>Puntajes Empatados</th>
                                            <th>Puntajes Jugados</th>
                                            <th>Goles a Fabor</th>
                                            <th>Goles en Contra</th>
                                            <th>Puntos</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {puntajesList.map((puntaje) => {
                                            return (
                                                <tr key={puntaje.id}>
                                                    <td>
                                                    <FotoPerfil x={puntaje.id_equipo} />
                                                    </td>
                                                    <td>{puntaje.equipo && <>
                                                            {puntaje.equipo.nombre}
                                                        </>
                                                    }</td>
                                                    <td>{puntaje.partidos_ganados}</td>
                                                    
                                                    <td>{puntaje.partidos_perdidos}</td>
                                                    <td>
                                                    {puntaje.partidos_empatados}
                                                    </td>
                                                    <td>{puntaje.partidos_jugados}</td>
                                                    <td>{puntaje.goles_favor}</td>
                                                    <td>
                                                    {puntaje.goles_contra}
                                                    </td>
                                                    <td>{puntaje.puntos}</td>
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
export default Puntaje;