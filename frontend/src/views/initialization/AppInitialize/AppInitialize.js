import React, { useEffect } from 'react';

import dayjs from 'dayjs'

function AppInitialize(props) {
  const { changeArea, setPeriodDateFrom, setPeriodDateTo, fetchData } = props

  useEffect(() => {
    changeArea('00') // 全国

    const today = dayjs(new Date())
    const twoMonthAgo = today.add(-1, 'month')
    setPeriodDateTo(today.format('YYYYMMDD'))
    setPeriodDateFrom(twoMonthAgo.format('YYYYMMDD'))

    fetchData()
  }, []);

  return (
    <> </>
  )


}

export default AppInitialize;
