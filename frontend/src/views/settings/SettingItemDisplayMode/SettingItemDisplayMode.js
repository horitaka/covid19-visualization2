import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import RoomIcon from '@material-ui/icons/Room';
import BarChartIcon from '@material-ui/icons/BarChart';
import Typography from '@material-ui/core/Typography';

import SettingItem from '../SettingItem/SettingItem'

export default function SettingItemDisplayMode(props) {
  const { displayMode, isMapInitialized, changeDisplayMode } = props

  const handleClick = (event, newDisplayMode) => {
    changeDisplayMode(newDisplayMode)
  }

  const mapButtonStyle = displayMode === 'map' ? 'contained' : 'outlined'
  const graphButtonStyle = displayMode === 'graph' ? 'contained' : 'outlined'

  const itemComponent = (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      spacing={1}
    >
      <Grid container item xs justify="center">
        <Button variant={mapButtonStyle} fullWidth color="primary" disabled={!isMapInitialized} onClick={(event) => handleClick(event, 'map')}>
          <RoomIcon /><Typography>　地図</Typography>
        </Button>
      </Grid>
      <Grid container item xs justify="center">
        <Button variant={graphButtonStyle} fullWidth color="primary" disabled={!isMapInitialized} onClick={(event) => handleClick(event, 'graph')}>
          <BarChartIcon /><Typography>　グラフ</Typography>
        </Button>
      </Grid>
    </Grid>
  )

  return (
    <SettingItem
      title="表示方法"
      itemComponent={itemComponent}
    />
  );
}
