/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react'
import { CChartPie } from '@coreui/react-chartjs'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const ChartPie = ({ title, data, labels}) => {
  var options = {
    tooltips: {
      enabled: false,
    },
    plugins: {
      // Change options for ALL labels of THIS CHART
      datalabels: [{
      }]
    },
  };
//   const percentage = (index) => {
//     const varTotal = data.carriers.map((test) => test.count)
//     console.log(varTotal)
//     const total = varTotal.reduce((previousValue, currentValue) => previousValue + currentValue)
//     return `(${((((Number(total[index]) / total) || 0) * 100).toFixed(2)).toString()}%)`
//   }
  return (
      <CCard className="mb-4">
        <CCardHeader>{title}</CCardHeader>
        <CCardBody>
          <CChartPie
            data={{
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
            options={options}
          />
        </CCardBody>
      </CCard>
  )
}

export default ChartPie
