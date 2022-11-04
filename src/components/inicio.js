import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Inicio = ()=>{
    return(
        <>
            <Container>
                <Row>
                    <Col>
                        <Card border="primary" style={{ width: '30rem' }}>
                            <Card.Header>Autores</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <p>Juan Manuel López Pachón</p>
                                    <p>Yesika Andrea Rojas</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card border="success" style={{ width: '30rem' }}>
                            <Card.Header>Info. del taller</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <p>Front: React</p>
                                    <p>Back: SpringBoot</p>
                                    <p>DB: Heroku - Postgres</p>
                                </Card.Text>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Inicio;