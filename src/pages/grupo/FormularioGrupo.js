import axios from 'axios';
import React, { useEffect, useState } from 'react' //imr
import { Button, Card, Col, Container, Form, FormControl, FormSelect, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
const FormularioGrupo = () => { //sfc
    const navigate = useNavigate();

    if (localStorage.getItem("token") == null) {
        navigate('/');
    }
    const { id } = useParams();

    const [nombre, setNombre] = useState('');
    const [validated, setValidated] = useState(false);


    useEffect(() => {
        if (id) {
            fetchGrupoById();
        }
    }, []);


    const fetchGrupoById = () => {
        axios.get('http://localhost:8000/api/grupo/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                const grupo = res.data;
                setNombre(grupo.nombre);

            }).catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    navigate('/login');
                }
            });
    }

    
    const saveGrupo = () => {
        const grupo = {
            "nombre": nombre
        }
        if (id) {
            doUpdate(grupo);
        } else {
            doCreate(grupo);
        }
    }
    const doUpdate = (grupo) => {
        axios.put('http://localhost:8000/api/grupo/' + id, grupo, {
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
    const doCreate = (grupo) => {
        axios.post('http://localhost:8000/api/grupo',
            grupo, {
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
        saveGrupo();
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Card className='mt-3 mb-3'>
                        <Card.Body>
                            <Card.Title><h1>Formulario Grupo</h1></Card.Title>

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
export default FormularioGrupo;