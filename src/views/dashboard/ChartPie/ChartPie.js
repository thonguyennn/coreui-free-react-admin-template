/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react'
import { CChartPie } from '@coreui/react-chartjs'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
// import {Chart} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// Chart.register(ChartDataLabels);

const ChartPie = ({ title, data, labels}) => {

  // const options = {
  //   tooltip: {
  //     enabled: false
  //   },
  //   plugins: {
  //     datalabels: {
  //       display: function(context) {
  //         console.log(context)
  //       },
  //     }
  //   },
  // };

  return (
      <CCard className="mb-4">
        <CCardHeader>{title}</CCardHeader>
        <CCardBody>
          <CChartPie
            data={{
              plugins: [ChartDataLabels],
              labels: labels ,
              datasets: [
                {
                  data,
                  backgroundColor: ['#4dc9f6','#f67019','#f53794','#537bc4','#acc236','#166a8f','#00a950','#58595b','#8549ba','#d8db18'],
                  hoverBackgroundColor: ['#4dc9f6','#f67019','#f53794','#537bc4','#acc236','#166a8f','#00a950','#58595b','#8549ba','#d8db18'],
                  borderColor: 'white'
                },
              ],
            }}
            options={{
              plugins: {
                datalabels: {
                  display: function(context) {
                    console.log(context)
                    console.log("skjdhksdhfd")
                  },
                }
              }
            }}
          />
        </CCardBody>
      </CCard>
  )
}

export default ChartPie
