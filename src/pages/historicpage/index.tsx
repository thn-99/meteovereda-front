import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Row, Col, Container, Spinner, Modal } from 'react-bootstrap'
import ReactECharts from "echarts-for-react";
import "./style.scss";
import baseUrl from "../../urls";

const HistoricPage = () => {

  const [historicData, sethistoricData] = useState<any>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [options, setOptions] = useState<any>();
  const [modalShow, setModalShow] = useState(false);
  const [modalText, setModalText] = useState("");

  const CenteredModal = (props: any) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Error
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{modalText}</h4>
        </Modal.Body>
      </Modal>
    );
  }

  const loadHistoric = () => {
    if (startDate == null || endDate == null) {
      setModalText("Seleccione ambas fechas");
      setModalShow(true);
      return;
    }
    if (startDate >= endDate) {
      setModalText("La fecha de inicio no puede ser menor que la fecha de fin");
      setModalShow(true);
      return;
    }


    setFadeOut(true);

    console.log(startDate);
    let params = {
      startDate: startDate,
      endDate: endDate
    }
    axios.get(baseUrl + "/api/weather/station/dates", { params }).then((result: any) => {

      sethistoricData(result.data);
      console.log(result.data);
      setFadeOut(false);
    }).catch((e: any) => console.log(e));
  };

  useEffect(() => {
    if (historicData) {
      setOptions({
        legend: {},
        tooltip: {
          trigger: "axis",
          triggerOn: 'click',
        },
        dataset: {
          dimensions: ["dt", "temp", "daily_rain"],
          source: historicData,
          sourceHeader: false,
        },
        series: [
          {
            type: "line",
            name: "Temperatura",
            formatter: 'C',
            smooth: true,
            yAxisIndex: "0",
            lineStyle: {
              color: 'lightblue',
              width: 2,
            },
            itemStyle: {
              color: '#1869b7',
            },
          },
          {
            yAxisIndex: 1,

            type: "bar",
            name: "Lluvia",
            itemStyle: {
              color: 'blue',
            },
          },
        ],
        xAxis: {
          // id:1,
          type: "category",
          axisLabel: {
            formatter: function (value: Date, index: any) {
              let d = new Date(value);
              return d.toUTCString();
            },
          },
        },
        yAxis: [{
          type: 'value',
          max: 40,
          axisLabel: {
            formatter: '{value} ºC',
          },
          splitLine: {
            show: false,
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(255,255,255,0.3)', 'rgba(200,200,200,0.1)'],
            },
          },
        },
        {
          id: 1,
          type: 'value',
          min: 0,
          max: 6,
          axisLabel: {
            formatter: '{value} mm',
          },
        }
        ],
      });
    }
  }, [historicData]);

  return (
    <div className="historic-grand-container">
      <Container>
        <Row className="d-flex justify-content-center">
          {/* texto para decir como funciona  */}
          <Col xs="8"><h3>Histórico de los datos de la estación meteorlógica</h3></Col>
        </Row>

        <Row >
          {/* Para los datepickers */}
          <Col className="date-picker-container"> <Button variant="info" className="mb-2 dateButton" disabled>inicio</Button> <br /> <input type="date" onChange={(e) => setStartDate(e.target.valueAsDate)} /></Col>
          <Col className="date-picker-container"><Button variant="info" className="mb-2 dateButton" disabled>fin</Button><br /><input type="date" onChange={(e) => setEndDate(e.target.valueAsDate)} /></Col>
          <Col><Button onClick={loadHistoric} ><span>go</span></Button></Col>
        </Row>

        {/* Aqui va la gráfica */}
        <div className="historic-graph-container">
          {historicData && options ? (

            <ReactECharts option={options} />

          ) : [
            fadeOut ? <Spinner animation="grow" /> : ``
          ]

          }
        </div>

        <Row className="mt-2 pt-2">
          <Col>
            <span>Puede descargar el fichero con todo el historico de datos de la estación:         <a href="http://127.0.0.1:20000/api/weather/csv" download>Descargar</a>
            </span>
          </Col>
        </Row>
      </Container>
      <CenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default HistoricPage;