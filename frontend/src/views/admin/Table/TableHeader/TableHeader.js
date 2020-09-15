import React, { useState, useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import dayjs from 'dayjs'
import DayjsUtils from '@date-io/dayjs';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  }
});

function TableHeader(props) {
  const { isFetching, isUploading, fetchData, uploadData } = props
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dataFetchingMode, setDataFetchingMode] = useState(1)
  const classes = useStyles();

  const handleChange = (event) => {
    setDataFetchingMode(event.target.value)
  }

  const handleDateChange = date => {
    const dateString = dayjs(date).format('YYYYMMDD')
    setSelectedDate(date);
    // fetchData({date: dateString})
    if (dataFetchingMode === 1) {
      fetchData({date: dateString, onlyUnconfirmed: true})
    } else {
      fetchData({date: dateString, onlyUnconfirmed: false})
    }
  };

  const handleUploadButtonClick = () => {
    uploadData()
  }

  useEffect(() => {
    if (dataFetchingMode === 1) {
      fetchData({onlyUnconfirmed: true})
    } else {
      fetchData({onlyUnconfirmed: false})
    }
  }, [fetchData, dataFetchingMode]);

  const getButtonText = () => {
    if (isFetching) {
      return 'データ取得中...'
    }
    if (isUploading) {
      return 'データアップロード中...'
    }

    return 'データアップロード'
  }

  return (
    <React.Fragment>
      <Grid
        item
        xs={4}
      >
        <FormControl className={classes.formControl} fullWidth>
          <Select value={dataFetchingMode} onChange={handleChange} displayEmpty className={classes.selectEmpty}>
            <MenuItem value={0} key={0}>
              全件
            </MenuItem>
            <MenuItem value={1} key={1}>
              未チェックのみ
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid
        item
        xs={4}
      >
        <MuiPickersUtilsProvider utils={DayjsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              autoOk
              disableToolbar
              variant="inline"
              format="YYYY/MM/DD"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </Grid>

      <Grid
        item
        xs={4}
      >
        <Button variant="contained" color="primary" onClick={handleUploadButtonClick}>
          {getButtonText()}
        </Button>
      </Grid>
    </React.Fragment>
  );
}

export default TableHeader;
