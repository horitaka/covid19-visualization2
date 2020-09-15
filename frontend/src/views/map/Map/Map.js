import React from 'react';

import MapLayout from '../MapLayout'
import Title from '../Title/Title'
import MapViewer from '../MapViewer'
import GraphViewer from '../GraphViewer'
import MapController from '../MapController'


function Map(props) {
  const { displayMode } = props

  return (
    <MapLayout
      titleComponent={<Title />}
      mapViewerComponent={displayMode === 'map' ? <MapViewer /> : <GraphViewer />}
      mapControllerComponent={<MapController />}
    />
  );
}

export default Map;
