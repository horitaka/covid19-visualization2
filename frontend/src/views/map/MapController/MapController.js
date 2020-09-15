import React from 'react';
// import dayjs from 'dayjs'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Chip from '@material-ui/core/Chip';
// import TodayIcon from '@material-ui/icons/Today';

import { convertDateStringToSelectValue, convertSelectedValueToDateString, formatDate, calculatePeriodDays } from '../../utils/dateutils'

const useStyles = makeStyles({
  box: {
    height: '100%',
    width: '100%',
    padding: '20px 15px',
  },
});


function MapController(props) {
  const { isMapInitialized, totalInjectedPeople, selectedDate, oldestDate, latestDate, changeDate } = props
  // console.log(totalInjectedPeople)
  const classes = useStyles();

  const handleDateChange = (event, newValue) => {
    const newSelectedDate = convertSelectedValueToDateString(newValue, oldestDate)
    changeDate(newSelectedDate)
  }

  const dataLabel = (selectedDate, peopleNum) => {
    return <Typography>{formatDate(selectedDate) + ' ' + peopleNum + '人'}</Typography>
  }

  return (
    <Grid
      container
      item
      xs={12}
      className={classes.box}
    >
      <Grid
        container
        item
        xs={12}
      >
        <Grid item xs={6}>
          <Typography id="date-select-slider" align="justify">
            日付を選択
          </Typography>
        </Grid>

        <Grid container item justify="flex-end" xs={6}>
          <Chip
            label={dataLabel(selectedDate, totalInjectedPeople)}
            color="primary"
            size="medium"
          />
        </Grid>
      </Grid>
      <Slider
        value={convertDateStringToSelectValue(selectedDate, oldestDate)}
        onChange={handleDateChange}
        aria-labelledby="date-select-slider"
        max={calculatePeriodDays(oldestDate, latestDate)}
        disabled={!isMapInitialized}
      />
  </Grid>
  )


}

export default MapController;
