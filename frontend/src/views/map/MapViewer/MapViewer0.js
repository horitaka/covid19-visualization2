import React, { useState, useEffect }  from 'react';
import Box from '@material-ui/core/Box';

import GoogleMap from './GoogleMap'
import { convertCovid19DataToGeoJson } from './mapfunctions'

let googleMap = null

function MapViewer(props) {
  const { covid19DataOnSelectedDay, completeMapInitialization }  = props
  const [needRerenderMap, setNeedRerenderMap] = useState(true)

  useEffect(() => {
    if ((covid19DataOnSelectedDay.length !== 0) && !googleMap) {
      googleMap = new GoogleMap()

      window.addEventListener('load', () => {
        console.log('Render map 01')
        googleMap.render()
        googleMap.renderCircle(convertCovid19DataToGeoJson(covid19DataOnSelectedDay))
        setNeedRerenderMap(false)
        completeMapInitialization()
      })

    }

    if (needRerenderMap && googleMap && googleMap.map) {
      console.log('Render map 02')
      googleMap.render()
      setNeedRerenderMap(false)
    }

    if (googleMap && googleMap.map) {
      console.log('Render circle 02')
      googleMap.renderCircle(convertCovid19DataToGeoJson(covid19DataOnSelectedDay))
    }

  }, [covid19DataOnSelectedDay]);


  return (
    <Box height="100%">
      <div id="map" data-lat="35.68093426903065" data-lng="139.76720809936523"></div>
    </Box>
  );
}

export default MapViewer;
