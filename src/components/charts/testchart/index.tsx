import React, { useEffect, useRef } from "react"
import * as echarts from "echarts"
const  TestChart= ({options,...props}:any)=> {

    const myChart = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    
    useEffect(() => {
        const chart = echarts.init(myChart.current)
        chart.setOption(options )
      }, [options])
    
      return (
        <div
          ref={myChart}
          style={{
            width: "100%",
            height: "100%",
          }}
        ></div>
      )
    
}
export default TestChart;