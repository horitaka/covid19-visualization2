var express = require('express');
var router = express.Router();

const covid19DataRaw = require('../models/Covid19DataRaw')
// const covid19dataRaw = Covid19DataRaw.getInstance()

/* GET users listing. */
// Todo: 未実装
router.get('/date/:date', async (req, res, next) => {
  const date = req.params.date
  const unconfirmedParam = req.query.unconfirmed === 'true' ? true : false

  const dataByDate = await covid19DataRaw.loadData(date, unconfirmedParam)
  res.send(dataByDate);
});

router.get('/', async (req, res, next) => {
  const unconfirmedParam = req.query.unconfirmed === 'true' ? true : false
  const data = await covid19DataRaw.loadAllData(unconfirmedParam)
  res.send(data);
});

router.post('/date/:date', async (req, res) => {
  const date = req.params.date
  const data = req.body

  await covid19DataRaw.storeData(date, data)
  res.send('success')
})

module.exports = router;
