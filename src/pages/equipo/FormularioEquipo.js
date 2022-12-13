import axios from 'axios';
import React, { useEffect, useState } from 'react' //imr
import { Button, Card, Col, Container, Form, FormControl, FormSelect, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
const FormularioEquipo = () => { //sfc
    const navigate = useNavigate();

    if (localStorage.getItem("token") == null) {
        navigate('/');
    }
    const { id } = useParams();

    const [nombre, setNombre] = useState('');
    const [grupo_id, setGrupoId] = useState('');
    const [idGrupo, setIdGrupo] = useState('');
    const [listaGrupos, setListaGrupos] = useState([])
    const [validated, setValidated] = useState(false);


    useEffect(() => {
        fetchListaGrupos();
        if (id) {
            fetchEquipoById();
        }
    }, []);

    const fetchListaGrupos = () => {
        axios.get('http://localhost:8000/api/grupo/', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

            .then(res => {
                const grupos = res.data;
                setListaGrupos(grupos);
                if (grupos.length > 0) {
                    setIdGrupo(grupos[0].id);
                }
            }).catch(err => {
                console.log(err);
                if(err.response.status === 401){
                    navigate('/login');
                }
            });
    }

    const fetchEquipoById = () => {
        axios.get('http://localhost:8000/api/equipo/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                const equipo = res.data;
                setNombre(equipo.nombre);
                setGrupoId(equipo.grupo_id);

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
            "grupo_id": idGrupo
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
    const onChangeGrupo = (e) => {
        setIdGrupo(e.target.value);
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
                                    <label>Grupo:</label>
                                    <FormSelect onChange={onChangeGrupo} value={idGrupo}>
                                        {listaGrupos.map((grupo) => (
                                            <option key={grupo.id} value={grupo.id}>{grupo.nombre}</option>
                                        ))}
                                    </FormSelect>
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