import { Col, Row } from "react-bootstrap";
import "./style.scss";
import HighLogo from './high.svg';
import LowLogo from './low.svg';


const Prediction = (props: any) => {
    console.log(props);
    const firste = props.daily[0];
    const mainIconName = "wi wi-owm-" + props.daily[0].weather[0].id + " main-icon";
    const dayNames= ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado"];
    const getWeekName = (day:number) =>{
        let date = new Date(day);
        return dayNames[date.getDay()];
    }
    const setWeatherClass = (i: number) => {
        if (i == 800) {
          return "weather-" + i.toString()+" future-container";
        } else {
          return "weather-" + i.toString().charAt(0)+" future-container";
        }
      };
    const dailies = props.daily.slice(0,4).map((day: any) =>
        <Col xs="6" md="3" className="mt-1 mb-1">
            <div className={setWeatherClass(day.weather[0].id)}>
                <Row className="pt-3 mb-2"><Col><span> <i className="wi wi-cloud"></i> {day.clouds}%</span></Col> <Col><i className="wi wi-windy"></i> {Math.floor(day.wind_speed)}</Col> <Col><i className="wi wi-raindrop"> </i> {Math.floor(day.pop)}</Col></Row>
                <Row className="justify-content-md-center mt-2 mb-2">
                    <Col md="12" lg="6">
                        <Row className="d-flex justify-content-center">
                            <Col xs="12" sm="3" md="4" lg="6" className="avg-temp"><span>{Math.floor(day.temp.day)}</span></Col>
                            <Col xs="12" sm="3" lg="5">
                                <Row className="d-none d-sm-block"><Col className="pd-1 pb-1"> <span>ºC</span></Col></Row>
                                <Row><Col className="alt-temp-container"><div className="alt-temp"><img src={HighLogo} alt=""/>{Math.ceil(day.temp.max)}</div></Col></Row>
                                <Row><Col className="alt-temp-container"><div className="alt-temp"><img src={LowLogo} alt=""/>{Math.ceil(day.temp.min)}</div></Col></Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="mt-2 mb-2"><Col><span>{getWeekName(day.dt*1000)}</span></Col></Row>

                <Row className="pt-2 pb-3"><Col><i className={mainIconName}></i></Col></Row>

            </div>
        </Col>
    );


    return (
        <Row className="mt-2 mb-2">
            {dailies}
        </Row>
    )

}

export default Prediction;