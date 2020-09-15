var express = require('express');
var router = express.Router();

const covid19DataRaw = require('../models/Covid19DataRaw')


/* GET users listing. */
router.post('/', async (req, res) => {
  // const covid19data = Covid19DataRaw.getInstance()
  const data = await covid19DataRaw.scrapeCovid19Data()
  res.send(data)

})


module.exports = router;
