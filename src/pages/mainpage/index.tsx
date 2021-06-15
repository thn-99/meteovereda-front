import { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import ReactECharts from "echarts-for-react";
import Prediction from "../../components/weather/prediction";
import CurrentContainer from "../../components/weather/current/currentcontainer";
import baseUrl from "../../urls";
const MainPage = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [options, setOptions] = useState<any>();
  const [fadeOut, setFadeOut] = useState(true);
  const formatterTooltip = (params: any) => {
    const temperature = params[0].data.temp;
    const rain = params[0].data.pop;
    const date = new Date(params[0].data.dt * 1000);
    const todayMidnight = new Date();
    todayMidnight.setHours(23, 59, 59, 0);
console.log(params);
    const tomorrowMidnight = new Date();
    tomorrowMidnight.setDate(tomorrowMidnight.getDate() + 1);
    tomorrowMidnight.setHours(23, 59, 59, 0);
    let day = "Hoy";

    if (date.getTime() >= tomorrowMidnight.getTime()) {
      day = "Pasado";
    } else if (date.getTime() >= todayMidnight.getTime()) {
      day = "Mañana";
    }
    console.log(todayMidnight);
    console.log(tomorrowMidnight);
    return `
      <div class="weather-chart-tooltip-time">${day} ${date.getHours()}:00</div>
      </br>
      <div class="weather-chart-tooltip-item">
        Temperatura: ${temperature} ºC
      </div>
      <div class="weather-chart-tooltip-item">
        Lluvia: ${rain} %
      </div>
      <div class="weather-chart-tooltip-item">
        Humedad: ${params[0].data.humidity} %
      </div>
      <div class="weather-chart-tooltip-item">
        Nubes: ${params[0].data.clouds} %
      </div>
      
     `;
  };

  const onChartLegendselectchanged = (e: any) => {
    console.log(e);
    console.log(e.selected.Temperatura);
    e.selected.Temperatura = false;
  }
  const chartEvents = {
    'legendselectchanged': onChartLegendselectchanged,
  }

  useEffect(() => {
    axios.get(baseUrl+"/api/weather/current").then((result) => {
      setWeatherData(result.data);
      console.log(result.data);
      setFadeOut(false);
    });
  }, []);

  useEffect(() => {
    if (weatherData) {
      setOptions({

        legend: {},
        tooltip: {
          trigger: "axis",
          triggerOn: 'click',
          formatter: formatterTooltip

          // formatter:"{a0} {b0}"
        },
        dataset: {
          dimensions: ["dt", "temp", "rain"],
          source: weatherData.open.hourly,
          sourceHeader: false,
        },
        series: [
          {
            id: 0,
            type: "line",
            name: "Temperatura",
            formatter: 'C',
            smooth: true,
            markPoint: {
              symbol: 'pin',
              symbolSize: 60,
              data: [
                { type: 'max', label: { show: true, color: "rgba(255, 255, 255, 1)" }, },
                { type: 'min', }
              ]
            },
            lineStyle: {
              color: 'lightblue',
              width: 2,
            },
            itemStyle: {
              color: '#1869b7',
            },
          },
          {

            type: "bar",
            name: "Lluvia",
            yAxisIndex: 1,
            itemStyle: {
              color: '#A4A4A4',
            },
          },
        ],
        xAxis: {
          // id:1,
          type: "category",
          axisLabel: {
            formatter: function (value: number, index: any) {
              let d = new Date(value * 1000);
              return d.getHours() + ":00";
            },
            color: function (value: any, index: any) {
              const todayMidnight = new Date();
              todayMidnight.setHours(23, 59, 59, 0);
          
              const tomorrowMidnight = new Date();
              tomorrowMidnight.setDate(tomorrowMidnight.getDate() + 1);
              tomorrowMidnight.setHours(23, 59, 59, 0);
              
              const nowDate = new Date(value*1000);
              if(nowDate>tomorrowMidnight){
                return 'rgb(100,0,0)';
              }else if(nowDate>todayMidnight){
                return 'rgb(0,100,0)';
              }else{
                return 'rgb(0,0,0)';
              }
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
          type: 'value',
          min: 0,
          max: 100,
          axisLabel: {
            formatter: '{value} %',
          },
        },],
      });
    }
  }, [weatherData]);

  return (
    <div className="App" style={fadeOut ? {filter: 'blur(2px)'} : undefined }>
      <Container>

        <h2>Datos Actuales</h2>
        {weatherData ? (
          <>
            <CurrentContainer weatherData={weatherData}></CurrentContainer>

            {options &&
            <>
            <h2 className="moar-padding">Predicción 48h</h2>
            <ReactECharts option={options} onEvents={chartEvents}
             /> </>}

            <h2 className="moar-padding">Predicción 4 dias</h2>
            <Prediction daily={weatherData.open.daily}></Prediction>

          </>
        ) : (
          <Spinner animation="grow"/>
        )}


        <Row>
          <Col>{/* <TestChart options={options}></TestChart> */}</Col>
        </Row>
      </Container>

      {/* <img src={logo} className="App-logo" alt="logo" /> */}
    </div>
  );
};

export default MainPage;
