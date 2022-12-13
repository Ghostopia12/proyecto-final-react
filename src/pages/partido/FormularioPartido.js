import axios from 'axios';
import React, { useEffect, useState } from 'react' //imr
import { Button, Card, Col, Container, Form, FormControl, FormSelect, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
const FormularioPartido = () => { //sfc
    const navigate = useNavigate();

    if (localStorage.getItem("token") == null) {
        navigate('/');
    }
    const { id } = useParams();

    const [equipo1_id, setEquipo1] = useState('');
    const [equipo2_id, setEquipo2] = useState('');
    const [inicio, setInicio] = useState('');
    const [final, setFinal] = useState('');
    const [marcador_equipo1, setMarcadorEquipo1] = useState('');
    const [marcador_equipo2, setMarcadorEquipo2] = useState('');
    const [estado, setEstado] = useState('');
    const [idEquipo, setIdEquipo] = useState('');
    const [listaEquipos, setListaEquipos] = useState([])
    const [validated, setValidated] = useState(false);


    useEffect(() => {
        fetchListaEquipos();
        if (id) {
            fetchPartidoById();
        }
    }, []);

    const fetchListaEquipos = () => {
        axios.get('http://localhost:8000/api/equipo/', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

            .then(res => {
                const equipos = res.data;
                setListaEquipos(equipos);
                if (equipos.length > 0) {
                    setIdEquipo(equipos[0].id);
                }
            }).catch(err => {
                console.log(err);
                if(err.response.status === 401){
                    navigate('/login');
                }
            });
    }

    const fetchPartidoById = () => {
        axios.get('http://localhost:8000/api/partido/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                const partido = res.data;
                setEquipo1(partido.equipo1_id);
                setEquipo2(partido.equipo2_id);
                setInicio(partido.inicio);
                setFinal(partido.final);
                setMarcadorEquipo1(partido.marcador_equipo1);
                setMarcadorEquipo2(partido.marcador_equipo2);
                setEstado(partido.estado);

            }).catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    navigate('/login');
                }
            });
    }

    
    const savePartido = () => {
        const partido = {
            "equipo1_id": equipo1_id,
            "equipo2_id": equipo2_id,
            "inicio": inicio,
            "final": final,
            "marcador_equipo1": marcador_equipo1,
            "marcador_equipo2": marcador_equipo2,
            "estado": estado
        }
        if (id) {
            doUpdate(partido);
        } else {
            doCreate(partido);
        }
    }
    const doUpdate = (partido) => {
        axios.put('http://localhost:8000/api/partido/' + id, partido, {
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
    const doCreate = (partido) => {
        axios.post('http://localhost:8000/api/partido',
            partido, {
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
        savePartido();
    }
    const onChangeEquipo1 = (e) => {
        setEquipo1(e.target.value);
    }
    const onChangeEquipo2 = (e) => {
        setEquipo2(e.target.value);
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Card className='mt-3 mb-3'>
                        <Card.Body>
                            <Card.Title><h1>Formulario Partido</h1></Card.Title>

                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <div>
                                    <div>
                                    <label>Equipo1:</label>
                                    <FormSelect onChange={onChangeEquipo1} value={equipo1_id}>
                                        {listaEquipos.map((equipo) => (
                                            <option key={equipo.id} value={equipo.id}>{equipo.nombre}</option>
                                        ))}
                                    </FormSelect>
                                    </div>
                                    <div>
                                    <label>Equipo2:</label>
                                    <FormSelect onChange={onChangeEquipo2} value={equipo2_id}>
                                        {listaEquipos.map((equipo) => (
                                            <option key={equipo.id} value={equipo.id}>{equipo.nombre}</option>
                                        ))}
                                    </FormSelect>
                                    </div>
                                    <div>
                                        <label>Inicio:</label>
                                        <input className='form-control' type="text"
                                            value={inicio} required
                                            onChange={(e) => setInicio(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es requerido
                                        </Form.Control.Feedback>
                                    </div>
                                    <div>
                                        <label>Final:</label>
                                        <input className='form-control' type="text"
                                            value={final} required
                                            onChange={(e) => setFinal(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es requerido
                                        </Form.Control.Feedback>
                                    </div>
                                    <div>
                                        <label>Marcador Equipo1:</label>
                                        <input className='form-control' type="number"
                                            value={marcador_equipo1} required
                                            onChange={(e) => setMarcadorEquipo1(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es requerido
                                        </Form.Control.Feedback>
                                    </div>
                                    <div>
                                        <label>Marcador Equipo2:</label>
                                        <input className='form-control' type="number"
                                            value={marcador_equipo2} required
                                            onChange={(e) => setMarcadorEquipo2(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es requerido
                                        </Form.Control.Feedback>
                                    </div>
                                    <div>
                                        <label>Estado:</label>
                                        <input className='form-control' type="number"
                                            value={estado} required
                                            onChange={(e) => setEstado(e.target.value)} />
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
export default FormularioPartido;