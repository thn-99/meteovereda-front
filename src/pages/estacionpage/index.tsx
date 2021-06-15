import axios from "axios";
import { useEffect, useState } from "react";
import {Row, Col, Container } from 'react-bootstrap'
import "./style.scss";
import baseUrl from "../../urls";
const EstacionPage = () => {

    const [stationData, setStationData] = useState<any>(null);

    useEffect(() => {
        axios.get(baseUrl + "/api/weather/info").then((result) => {
            setStationData(result.data);
            console.log(result);
        });

    }, []);

    const getFormatedDate = (inputDate: any) => {
        let date = new Date(inputDate);
        return date.toUTCString();
    }

    return (
        <div className="estacion-container">
            {stationData &&
                <Container>
                    <Row>
                        <Col>
                            <h3>Último dato de la estación</h3>
                            <h4>{getFormatedDate(stationData.station.dt)}</h4>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <h3>Último dato de OpenWeather</h3>
                            <h4>{getFormatedDate(stationData.open.dt)}</h4>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            {stationData.error &&
                                <>
                                    <h3>Último error</h3>

                                    <h4>{stationData.error.dt} {stationData.error.error.error} en {stationData.error.source.source}</h4>
                                </>
                            }
                        </Col>
                    </Row>
                </Container>

            }
        </div>
    );
};

export default EstacionPage;