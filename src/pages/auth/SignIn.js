import axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, FormControl, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const SignIn = () => {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [validated, setValidated] = useState(false);


    const doSignIn = () => {
        const params = {
            "name": name,
            "email": email,
            "password": password,
        }
        console.log(params);
        axios.post('http://localhost:8000/api/auth/register',
            params)
            .then(res => {
                if(res.data.access_token){
                    localStorage.setItem('token', res.data.access_token);
                    navigate('/');
                }
            }).catch(err => {
                console.log(err);
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
        doSignIn();
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Card className='mt-3 mb-3'>
                        <Card.Body>
                            <Card.Title><h1>Registrar</h1></Card.Title>

                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <div>
                                <div>
                                        <label>Nombre:</label>
                                        <FormControl type="text"
                                            value={name} required
                                            onChange={(e) => setName(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es requerido
                                        </Form.Control.Feedback>
                                    </div>
                                    <div>
                                        <label>Email:</label>
                                        <FormControl type="text"
                                            value={email} required
                                            onChange={(e) => setEmail(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es requerido
                                        </Form.Control.Feedback>
                                    </div>
                                    <div>
                                        <label>Contraseña:</label>
                                        <FormControl type="password"
                                            value={password} required
                                            onChange={(e) => setPassword(e.target.value)} />
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

export default SignIn;