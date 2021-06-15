import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Open from '../open';
import Station from '../station';
import "./style.scss";
const CurrentContainer = (props: any) => {

    const [value, setValue] = useState("station");


    console.log(props)

    function changeWeather(e: any) {
        setValue(e.target.value);
        console.log(e);
    }
    return (

        <div className="pt-3">
            <Row>
                <Col><Button value="station" onClick={changeWeather} >Station</Button> </Col>
                <Col><Button value="open" onClick={changeWeather}>OpenWeather</Button></Col>
            </Row>
            {
                value == "station" &&
                <Station station={props.weatherData.station} ></Station>
            }

            {
                value == "open" &&
                <Open open={props.weatherData.open.current} />
            }


        </div>
    )
}
export default CurrentContainer;
