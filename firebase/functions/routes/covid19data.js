var express = require('express');
var router = express.Router();

const Covid19Data = require('../models/Covid19Data')
const covid19data = Covid19Data.getInstance()

/* GET users listing. */
router.get('/date/:date', async (req, res, next) => {
  const date = req.params.date
  const dataByDate = await covid19data.loadData(date)
  res.send(dataByDate);
});

router.get('/', async (req, res, next) => {
  const from = req.query.from
  const to = req.query.to

  const data = await covid19data.loadPeriodData(from, to)
  res.send(data);
});

router.post('/', async (req, res) => {
  const allDayData = req.body
  console.log(req.body)

  await covid19data.storeAllData(allDayData)
  res.send('success')

})

module.exports = router;
