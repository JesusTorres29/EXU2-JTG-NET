import React, { useState } from 'react';
import { Container, Navbar, Nav, Form, Button, Card, Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { saludoApi } from './api/saludo';

function App() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [saludo, setSaludo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // TODO: Reemplazar con tu información real
  const nombreCompleto = 'Tu Nombre Completo';
  const grado = '5to';
  const grupo = 'A';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaludo('');

    if (!nombre.trim()) {
      setError('El nombre es requerido');
      return;
    }

    if (!apellido.trim()) {
      setError('El apellido es requerido');
      return;
    }

    setLoading(true);

    try {
      const request = {
        nombre: nombre.trim(),
        apellido: apellido.trim(),
      };

      const response = await saludoApi.saludar(request);

      if (response.success && response.data) {
        setSaludo(response.data.saludo);
        await Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: response.message || 'Saludo generado exitosamente',
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        throw new Error(response.message || 'Error al procesar el saludo');
      }
    } catch (err) {
      const errorMessage = err.message || 'Error al enviar el saludo';
      setError(errorMessage);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">
            Sistema de saludo
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Inicio</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <Card>
              <Card.Header as="h4" className="text-center">
                Sistema de Saludo
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formNombre">
                    <Form.Label>Nombre(s)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingresa tu(s) nombre(s)"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formApellido">
                    <Form.Label>Apellido(s)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingresa tu(s) apellido(s)"
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </Form.Group>

                  {error && (
                    <Alert variant="danger" className="mb-3">
                      {error}
                    </Alert>
                  )}

                  <div className="d-grid">
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={loading}
                      size="lg"
                    >
                      {loading ? 'Enviando...' : 'Saludar'}
                    </Button>
                  </div>
                </Form>

                {saludo && (
                  <Alert variant="success" className="mt-4">
                    <Alert.Heading>Saludo recibido:</Alert.Heading>
                    <p className="mb-0 fs-5">{saludo}</p>
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}

export default App;

