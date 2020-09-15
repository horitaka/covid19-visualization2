import React from 'react';
import Box from '@material-ui/core/Box';

import GoogleMap from './GoogleMap'
import { convertCovid19DataToGeoJson } from './mapfunctions'

let googleMap = null

class MapViewer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      needRerenderMap: true,
    }

    this.renderMap = this.renderMap.bind(this)
    this.renderCircle = this.renderCircle.bind(this)
    window.addEventListener('load', () => {
      this.renderMap();
      this.renderCircle();
    })
  }

  renderMap() {
    const { completeMapInitialization }  = this.props

    googleMap.render()
    this.setState({
      needRerenderMap: false,
    })
    completeMapInitialization()
  }

  renderCircle() {
    const { covid19DataOnSelectedDay, selectedArea }  = this.props
    let covid19DataOnSelectedDayByArea = []
    const tmpData = covid19DataOnSelectedDay.find(data => data.areaCode === selectedArea)
    if (tmpData) {
      covid19DataOnSelectedDayByArea = [tmpData]
    }
    const dataToDisplay = selectedArea === '00' ? covid19DataOnSelectedDay : covid19DataOnSelectedDayByArea
    googleMap.renderCircle(convertCovid19DataToGeoJson(dataToDisplay))
  }

  componentDidMount() {
    const { needRerenderMap } = this.state

    if( !googleMap ) {
      googleMap = new GoogleMap()
    }

    if (needRerenderMap && googleMap && googleMap.map) {
      googleMap.render()
      this.setState({
        needRerenderMap: false,
      })
    }
  }

  componentDidUpdate() {
    if (googleMap && googleMap.map) {
      this.renderCircle()
    }
  }

  render() {
    return (
      <Box height="100%">
        <div id="map" data-lat="36.14362780879501" data-lng="137.96545028686523"></div>
      </Box>
    )
  }

}

export default MapViewer;
