import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GetAppIcon from '@material-ui/icons/GetApp';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import dayjs from 'dayjs'
import DayjsUtils from '@date-io/dayjs';

import SettingItem from '../SettingItem/SettingItem'

const useStyles = makeStyles(thme => ({
  datePicker: {
    marginTop: '0'
  },
}));

function SettingItemDate(props) {
  const { dateFrom, dateTo, setPeriodDateFrom, setPeriodDateTo, fetchData } = props
  const { isMapInitialized } = props
  const classes = useStyles();

  const handleDateFromChange = date => {
    if (date <= dayjs(dateTo)) {
      // setDateFrom(date);
      const dateString = dayjs(date).format('YYYYMMDD')
      setPeriodDateFrom(dateString)
    }
  };

  const handleDateToChange = date => {
    if (date >= dayjs(dateFrom)) {
      // setDateTo(date);
      const dateString = dayjs(date).format('YYYYMMDD')
      setPeriodDateTo(dateString)
    }
  };

  const handleDataFetchButtonClick = () => {
    fetchData()
  }

  const dateFromDayjs = dateFrom ? dayjs(dateFrom, 'YYYYMMDD') : dayjs(new Date())
  const dateToDayjs = dateTo ? dayjs(dateTo, 'YYYYMMDD') : dayjs(new Date())
  const itemComponent = (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="center"
      spacing={1}
    >
      <Grid container item xs={12} spacing={1}>

        <Grid item xs={6}>
          <MuiPickersUtilsProvider utils={DayjsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                autoOk
                disableToolbar
                variant="inline"
                format="YYYY/MM/DD"
                margin="normal"
                id="date-picker-from"
                label="From"
                value={dateFromDayjs}
                onChange={handleDateFromChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                className={classes.datePicker}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid item xs={6}>
          <MuiPickersUtilsProvider utils={DayjsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                autoOk
                disableToolbar
                variant="inline"
                format="YYYY/MM/DD"
                margin="normal"
                id="date-picker-to"
                label="To"
                value={dateToDayjs}
                onChange={handleDateToChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                className={classes.datePicker}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <Grid container item xs={12} justify="center">
        <Button variant="contained" fullWidth color="primary" disabled={!isMapInitialized} onClick={handleDataFetchButtonClick}>
          <GetAppIcon /><Typography>　データ取得</Typography>
        </Button>
      </Grid>
    </Grid>
  )

  return (
    <SettingItem
      title="日付を選択"
      itemComponent={itemComponent}
    />
  );
}

export default SettingItemDate;
