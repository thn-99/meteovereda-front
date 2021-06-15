import { Component } from 'react'
import { Card, Row, Col, Container } from 'react-bootstrap'
import './style.scss';

export default class Station extends Component<any>{

    render() {
        const windDirection = this.props.station.wind_direction.toLowerCase();
        let deg;
        switch (windDirection) {
            case "n":
                deg = 0;
                break;
            case "e":
                deg = 90;
                break;
            case "w":
                deg = -90;
                break;
            case "s":
                deg = 180;
                break;
            case "ne":
                deg = 45;
                break;
            case "nw":
                deg = -45;
                break;
            case "sw":
                deg = -135;
                break;
            case "se":
                deg = 135;
                break;
            case "ene":
                deg = 68;
                break;
            case "sse":
                deg = 158;
                break;
            case "wsw":
                deg = 248;
                break;
            case "nnw":
                deg = 336;
                break;
            case "nne":
                deg = 23;
                break;
            case "ese":
                deg = 113;
                break;
            case "ssw":
                deg = 203;
                break;
            case "wnw":
                deg = 293;
                break;
            default:
                break;
        }
        const rot = {
            transform: `rotate(${deg}deg)`
        };
        return (
            <Card className="mt-2">
                <Row className="weather-elements-row pt-3 mt-2" >
                    <Col >
                        <div>
                            <span><i className="wi wi-thermometer"></i></span>
                            <br />
                            <span>{this.props.station.temp}</span>
                            <span> ºC</span>
                        </div>
                    </Col>
                    <Col
                    ><div><span><i className="wi wi-humidity"></i></span>
                            <br />
                            <span>{this.props.station.humidity}</span>
                        </div></Col
                    >
                    <Col
                    ><div><span><i className="wi wi-strong-wind"></i></span>
                            <br />
                            <span>{this.props.station.wind_speed}</span>
                            <span> km/h</span>
                        </div>
                    </Col>
                </Row>

                <Row className="weather-elements-row mt-4 mb-4">
                    <Col>
                        <div>

                            <span><i className="wi wi-wind-direction" style={rot}></i></span>
                            <br />
                            <span>{this.props.station.wind_direction}</span>
                        </div>
                    </Col>
                    <Col
                    ><div><span><i className="wi wi-barometer"></i></span>
                            <br />
                            <span>{this.props.station.barometer}</span>
                            <span> hPa</span>
                        </div>
                    </Col>
                    <Col
                    ><div><span><i className="wi wi-raindrop"></i></span>
                            <br />
                            <span>{this.props.station.daily_rain}</span>
                            <span> mm</span>
                        </div>
                    </Col>
                </Row>
            </Card >
        )
    }
}
