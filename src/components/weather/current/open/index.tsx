import { Component } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import './style.scss';

export default class Open extends Component<any>{

    render() {
        const iconName = "wi wi-owm-" + this.props.open.weather[0].id;

        const rot = {
            transform: `rotate(${this.props.open.wind_deg}deg)`
        };
        return (
            <Card className="mt-2">
                <Row className="d-flex justify-content-center pt-3 pb-3">
                    <Col className="advanced-button-container d-flex justify-content-center" sm={6} md={4}>

                        <Row className="justify-content-center">
                            <Col className="open-top-col"><div className="open-main-icon-container"><i className={iconName}></i></div></Col>
                            <Col className="open-top-col">
                                <span className="open-temp-container">{Math.floor(this.props.open.temp)}</span> <span> ºC</span>
                            </Col>
                        </Row>
                        <br />
                        <div>



                        </div>
                    </Col>
                </Row>

                <Row className="weather-elements-row" >
                    <Col >
                        <div>
                            <span><i className="wi wi-cloud"></i></span>
                            <br />
                            <span>{this.props.open.clouds}</span>
                            <span> %</span>
                        </div>
                    </Col>
                    <Col
                    ><div><span><i className="wi wi-humidity"></i></span>
                            <br />
                            <span>{this.props.open.humidity}</span>
                        </div></Col
                    >
                    <Col
                    ><div><span><i className="wi wi-wind-direction" style={rot}></i></span>
                            <br />
                            <span>{this.props.open.wind_speed}</span>
                            <span> km/h</span>
                        </div>
                    </Col>
                </Row>

                <Row className="weather-elements-row mt-3 mb-3">
                    <Col>
                        <div><span>uvi</span>
                            <br />
                            <span>{this.props.open.uvi}</span>
                        </div>
                    </Col>
                    <Col
                    ><div><span><i className="wi wi-barometer"></i></span>
                            <br />
                            <span>{this.props.open.pressure}</span>
                            <span> hpa</span>
                        </div>
                    </Col>
                    <Col
                    ><div><span>visibilidad</span>
                            <br />
                            <span> {this.props.open.visibility}km</span>
                        </div>
                    </Col>
                </Row>
            </Card >
        )
    }
}
