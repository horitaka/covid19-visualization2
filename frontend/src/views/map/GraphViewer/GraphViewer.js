import React from 'react';

import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';

import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

import { convertDateStringToSelectValue, convertSelectedValueToDateString, formatDate } from '../../utils/dateutils'

function GraphViewer(props) {
  const { covid19DataSelectedArea, selectedDate, oldestDate, changeDate }  = props

  const theme = useTheme();
  const [activeBarIndex, setActiveBarIndex] = React.useState(-1)
  const [graphWidth, setGraphWidth] = React.useState(0)
  const [graphHeight, setGraphHeight] = React.useState(0)


  // data format
  // covid19DataOnSelectedDay = {
  //   '20200320': {
  //     totalInjectedPeople: 6
  //     injectedPeople: 6
  //     noSymptomsPeople: 0
  //     positivePeople: 0
  //     deadPeople: 0
  //   },
  //   '20200321': {
  //     totalInjectedPeople: 6
  //     injectedPeople: 6
  //     noSymptomsPeople: 0
  //     positivePeople: 0
  //     deadPeople: 0
  //   }
  // }
  const covidDataToGraphFormat = (covid19DataSelectedRegion) => {
    const dateList = Object.keys(covid19DataSelectedRegion)
    const convertedData = dateList.map(date => {
      return {
        date: formatDate(date),
        感染者数: covid19DataSelectedRegion[date] ? covid19DataSelectedRegion[date].totalInjectedPeople : 0
      }
    })

    return convertedData
  }


  // const CustomTooltip = ({ payload, label, active }) => {
  //   if (active) {
  //     return (
  //       <div className="custom-tooltip">
  //         <p className="label">{`${label} : ${payload[0].value}`}</p>
  //       </div>
  //     );
  //   }
  //   return null;
  // }

  const handleClick = (data, index) => {
    setActiveBarIndex(index)
    const selectedDateString = convertSelectedValueToDateString(index, oldestDate)
    changeDate(selectedDateString)
  }

  React.useEffect(() => {
    const element = document.getElementById('viewer__box--graph')
    setGraphWidth(element.clientWidth)
    setGraphHeight(element.clientHeight)
  }, [])

  React.useEffect(() => {
    const selectedDateValue = convertDateStringToSelectValue(selectedDate, oldestDate)
    setActiveBarIndex(selectedDateValue)
  }, [selectedDate, oldestDate])

  const grapheData = covidDataToGraphFormat(covid19DataSelectedArea)
  return (
    <Box height="100%" id="viewer__box--graph">
      <BarChart
        width={graphWidth}
        height={graphHeight}
        data={grapheData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="感染者数" fill={theme.palette.primary.main} onClick={handleClick}>
          {
            grapheData.map((entry, index) => (
              <Cell cursor="pointer" fill={index === activeBarIndex ? theme.palette.primary.main : theme.palette.secondary.main } key={`cell-${index}`} />
            ))
          }
        </Bar>
      </BarChart>
    </Box>
  )


}

export default GraphViewer;
