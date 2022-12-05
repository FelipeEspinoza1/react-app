import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import "./stats.css";
import Torta from "./piechart"
import Barchart from "./barchart"
import axios from "axios";

const host = process.env.REACT_APP_HOST_BACKEND

const data1 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const data2 = [
    { name: 'Felipe Espinoza', value: 205 },
    { name: 'Bastián Castro', value: 240 },
    { name: 'José Mera', value: 45 }
]

const Stats = () => {

    let [counter_citas, setCounter] = useState([]);
    let [years, setYears] = useState([]);
    let [loadingY, setLoadingY] = useState(true);

    useEffect(() => {
        axios.get((host + "/api/stats/getCitasCounter"))
            .then(res => {
                setCounter(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get((host + "/api/stats/getYears"))
            .then(res => {
                setYears(res.data)
                setLoadingY(false);
            })
            .catch(err => console.log(err))
    }, [])

    if (loadingY) {
        return (
            <Container fluid>
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            </Container>
        )
    }
    else {
        return (
            <Container fluid>
                <Row className='title'>
                    <p><b>Estadísticas anuales</b></p>
                    <form className="form-year">
                        <label htmlFor="select-year">Seleccione año:</label>
                        <select name="years" id="select-year">
                            {years['value'].map(element => <option key={element} value={element}>{element}</option>)}
                        </select>
                    </form>
                </Row>
                <Row className='subtitle'>
                    <p><b>Estadísticas generales</b></p>
                </Row>
                <Row className='row-content'>
                    <p>Cantidad de citas anuales:</p>
                    <b className='stats-citas'>{counter_citas}</b>
                </Row>
                <Row className='row-content'>
                    <p>Gráfico de citas por mes</p>
                </Row>
                <Row className='row-content'>
                    <Col>
                        <Card className='chart-card'>
                            <Card.Body>
                                <Card.Title>Tipo de cita</Card.Title>
                                <Torta data={data1}>
                                </Torta>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className='chart-card'>
                            <Card.Body>
                                <Card.Title>Profesionales agendados</Card.Title>
                                <Row>
                                    <p>El más agendado: <span style={{ color: "#82ca9d" }}>Bastián Castro</span></p>
                                </Row>
                                <Row>
                                    <Barchart data={data2}></Barchart>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className='subtitle'>
                    <p><b>Estadísticas por profesional</b></p>
                </Row>
            </Container>
        )
    }

}

export default Stats;