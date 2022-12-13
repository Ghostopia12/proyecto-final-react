import axios from 'axios';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import FotoPerfil from '../../components/FotoPerfil';
import ListaGrupo from '../grupo/ListaGrupo';

let timeoutActual = null;
const actualizarDatos = (doUpdate) => {
    if (timeoutActual != null) {
        clearTimeout(timeoutActual);
        timeoutActual = null;
    }
    doUpdate().finally(() => {
        timeoutActual = setTimeout(() => {
            actualizarDatos(doUpdate);
        }, 30000);
    });
}
const Principal = () => {

    /*
     <Container>
                <Card className='mt-3 mb-3'>
                    <Card.Body>
                        <Card.Title>
                            <h1>Partido en curso</h1>
                        </Card.Title>
                        {partidosList.map((partido) => {
                            return (
                                <div className='row justify-content-center' key={partido.id}>
                                    <div>
                                        <h3>{partido.inicio}</h3>
                                        <h3>{partido.final}</h3>
                                    </div>
                                    <div>
                                    <FotoPerfil x={partido.equipo1_id} />
                                    <h2>{partido.equipo1_id}</h2>
                                    <h1>{partido.marcador_equipo1}</h1>
                                    </div>
                                    <FotoPerfil x={partido.equipo2_id} />
                                    <h2>{partido.equipo2_id}</h2>
                                    <h1>{partido.marcador_equipo2}</h1>
                                </div>
                            );
                        })}
                    </Card.Body>
                </Card>
            </Container>
            <Container>
                <Row>
                    <Col>
                        <Card className='mt-3 mb-3'>
                            <Card.Body>
                                <Card.Title>
                                    <h1>Grupos</h1>
                                </Card.Title>
                                <div>
                                            {gruposList.map((grupo) => {
                                                return (
                                                    <div key={grupo.id}>

                                                        <h1>{grupo.nombre}</h1>
                                                        <div>
                                                            {grupo.equipos && grupo.equipos.map((equipo) => {
                                                                <div>
                                                                    <h2>{equipo.nombre}</h2>
                                                                </div>
                                                            })}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
    */
    const navigate = useNavigate();

    const [partidosList, setPartidosList] = useState([]);
    const [gruposList, setGruposList] = useState([]);
    const [event, setEventList] = useState([]);


    useEffect(() => {
        actualizarDatos(fetchPartidos);
        actualizarDatos(fetchGrupos);
    }, [])

    const fetchPartidos = () => {
        return axios.get('http://localhost:8000/api/partido/curso', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                setPartidosList(res.data);
                //   console.log(res.data);
            }).catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    navigate('/login');
                }
            });
    }

    const fetchGrupos = () => {
        return axios.get('http://localhost:8000/api/grupo', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                console.log(res);
                setGruposList(res.data);
            }).catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    navigate('/login');
                }
            });
    }

    /*const fetchEventos = (partido, equipo) => {
        return axios.get('http://localhost:8000/api/evento/especif/' + partido + '/' + equipo, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                console.log(res);
                setEventList(res.data);
            }).catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    navigate('/login');
                }
            });
    }*/
    return (
        <>
            <table className='table'>
                <h1>Partidos en curso</h1>
                {partidosList.map((partido) => {
                    return (
                        <div className='row justify-content-center' key={partido.id}>
                            <thead>
                                <th>
                                    Equipo1
                                </th>
                                <th>
                                    Equipo2
                                </th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Inicio {partido.inicio}</td>
                                    <td>Fin {partido.final}</td>
                                </tr>

                                <tr>
                                    <td><FotoPerfil x={partido.equipo1_id} /></td>
                                    <td><FotoPerfil x={partido.equipo2_id} /></td>
                                </tr>

                                <tr>
                                    <td>
                                        <h1>{partido.marcador_equipo1}</h1></td>
                                    <td>
                                        <h1>{partido.marcador_equipo2}</h1></td>
                                </tr>

                                <tr>
                                    <td>{
                                        //fetchEventos(partido.id, partido.equipo1_id)
                                    }</td>
                                    <td>{
                                        //fetchEventos(partido.id, partido.equipo2_id)
                                    }</td>
                                </tr>
                            </tbody>
                        </div>
                    );
                }
                )}

            </table>



            {
                gruposList.map((grupo) => {
                    return (
                        <Link to={"/puntuaciones/" + grupo.id} key={grupo.id}>

                            <h1>{grupo.nombre}</h1>
                            <div>
                                {grupo.equipos && grupo.equipos.map((equipo) => {
                                    return (
                                    <div key={equipo.id}>
                                        <h2>{equipo.nombre}</h2>
                                        {grupo.equipos && grupo.equipos.map((equipo) => {
                                            return (
                                                <div>
                                                    <h2>{equipo.nombre}</h2>
                                                    {console.log(equipo.nombre)}
                                                </div>
                                            )

                                        })
                                        }
                                    </div>
                                    )
                                })}
                            </div>
                        </Link>
                    );
                })
            }



        </>
    );
}
export default Principal;