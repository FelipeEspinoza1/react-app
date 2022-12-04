import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { ResponsiveContainer } from 'recharts';
import "./stats.css";
import Torta from "./piechart"


const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const Stats = () => {
    return (
        <Container fluid>
            <Row className='title'>
                <Col>
                <strong>Estadísticas anuales</strong>
                </Col>
            </Row>
            <Row className='subtitle'>
                <strong>Estadísticas generales</strong>
            </Row>
            <Row className='row-content'>
                <h5>Cantidad de citas anuales:</h5>
                <strong className='stats-citas'>765</strong>
            </Row>
            <Row className='row-content'>
                <h5>Gráfico de citas por mes</h5>
            </Row>
            <Row className='row-content'>
                <Col>
                    <Card className='chart-card'>
                        <Card.Body>
                            <Card.Title>Tipo de cita</Card.Title>
                            <Torta data={data}>
                            </Torta>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className='chart-card'>
                        <Card.Body>
                            <Card.Title>Profesionales agendados</Card.Title>
                            <Col>
                                <ResponsiveContainer>
                                    <strong>xd</strong>
                                </ResponsiveContainer>
                            </Col>
                            <Col>
                                El más agendado
                            </Col>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className='subtitle'>
                <strong>Estadísticas por profesional</strong>
            </Row>
        </Container>
    )
}

export default Stats;