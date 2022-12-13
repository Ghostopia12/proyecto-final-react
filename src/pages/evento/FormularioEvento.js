import axios from 'axios';
import React, { useEffect, useState } from 'react' //imr
import { Button, Card, Col, Container, Form, FormControl, FormSelect, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
const FormularioEvento = () => { //sfc
    const navigate = useNavigate();

    if (localStorage.getItem("token") == null) {
        navigate('/');
    }
    const { id } = useParams();

    const [partido_id, setPartido] = useState('');
    const [equipo_id, setEquipo] = useState('');
    const [minuto, setMinuto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [idPartido, setIdPartido] = useState('');
    const [listaPartidos, setListaPartidos] = useState([])
    const [idEquipo, setIdEquipo] = useState('');
    const [listaEquipos, setListaEquipos] = useState([])
    const [validated, setValidated] = useState(false);


    useEffect(() => {
        fetchListaEquipos();
        fetchListaPartidos();
        if (id) {
            fetchEventoById();
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
    const fetchListaPartidos = () => {
        axios.get('http://localhost:8000/api/partido/', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

            .then(res => {
                const partidos = res.data;
                setListaPartidos(partidos);
                if (partidos.length > 0) {
                    setIdPartido(partidos[0].id);
                }
            }).catch(err => {
                console.log(err);
                if(err.response.status === 401){
                    navigate('/login');
                }
            });
    }

    const fetchEventoById = () => {
        axios.get('http://localhost:8000/api/evento/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                const evento = res.data;
                setPartido(evento.partido_id);
                setEquipo(evento.equipo_id);
                setMinuto(evento.minuto);
                setDescripcion(evento.descripcion);

            }).catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    navigate('/login');
                }
            });
    }

    
    const saveEvento = () => {
        const evento = {
            "partido_id": partido_id,
            "equipo_id": equipo_id,
            "minuto": minuto,
            "descripcion": descripcion
        }
        if (id) {
            doUpdate(evento);
        } else {
            doCreate(evento);
        }
    }
    const doUpdate = (evento) => {
        axios.put('http://localhost:8000/api/evento/' + id, evento, {
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
    const doCreate = (evento) => {
        console.log(evento);
        axios.post('http://localhost:8000/api/evento',
            evento, {
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
        saveEvento();
    }
    const onChangeEquipo = (e) => {
        setEquipo(e.target.value);
    }
    const onChangePartido = (e) => {
        setPartido(e.target.value);
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Card className='mt-3 mb-3'>
                        <Card.Body>
                            <Card.Title><h1>Formulario Evento</h1></Card.Title>

                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <div>
                                    <div>
                                    <label>Partido:</label>
                                    <FormSelect onChange={onChangePartido} value={partido_id}>
                                        {listaPartidos.map((partido) => (
                                            <option key={partido.id} value={partido.id}>{partido.id}</option>
                                        ))}
                                    </FormSelect>
                                    </div>
                                    <div>
                                    <label>Equipo:</label>
                                    <FormSelect onChange={onChangeEquipo} value={equipo_id}>
                                        {listaEquipos.map((equipo) => (
                                            <option key={equipo.id} value={equipo.id}>{equipo.nombre}</option>
                                        ))}
                                    </FormSelect>
                                    </div>
                                    <div>
                                        <label>Minuto:</label>
                                        <input className='form-control' type="number"
                                            value={minuto} required
                                            onChange={(e) => setMinuto(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es requerido
                                        </Form.Control.Feedback>
                                    </div>
                                    <div>
                                        <label>Descripcion:</label>
                                        <input className='form-control' type="text"
                                            value={descripcion} required
                                            onChange={(e) => setDescripcion(e.target.value)} />
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
export default FormularioEvento;