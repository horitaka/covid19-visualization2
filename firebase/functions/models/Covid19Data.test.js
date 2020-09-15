const covid19data = require('./Covid19Data')

describe('Covid19Data-extractWillScrapePageInfo', () => {
  it('return correct pageInfo', () => {
    const allPageInfo = [
      {
          "url": "https://mhlw-gis.maps.arcgis.com/apps/opsdashboard/index.html#/c2ac63d9dd05406dab7407b5053d108e",
          "text": "https://mhlw-gis.maps.arcgis.com/apps/opsdashboard/index.html#/c2ac63d9dd05406dab7407b5053d108e",
          "type": "OTHER"
      },
      {
          "url": "https://www.mhlw.go.jp/stf/newpage_10316.html",
          "text": "新型コロナウイルスに関連した患者等の発生について(3月18日公表分) ",
          "type": "DAYLY_REPORT"
      },
      {
          "url": "https://www.mhlw.go.jp/stf/newpage_10313.html",
          "text": "新型コロナウイルスに関連した無症状病原体保有者の発生について",
          "type": "AIRPORT_REPORT"
      },
      {
          "url": "https://www.mhlw.go.jp/stf/newpage_10264.html",
          "text": "新型コロナウイルスに関連した患者等の発生について(3月17日公表分) ",
          "type": "DAYLY_REPORT"
      },
      {
          "url": "https://www.mhlw.go.jp/stf/newpage_10236.html",
          "text": "新型コロナウイルスに関連した患者等の発生について(3月16日公表分) ",
          "type": "DAYLY_REPORT"
      }
    ]
    const didScrapePageInfo = [
      {
          "url": "https://www.mhlw.go.jp/stf/newpage_10316.html",
          "text": "新型コロナウイルスに関連した患者等の発生について(3月18日公表分) ",
          "type": "DAYLY_REPORT"
      },
      {
          "url": "https://www.mhlw.go.jp/stf/newpage_10236.html",
          "text": "新型コロナウイルスに関連した患者等の発生について(3月16日公表分) ",
          "type": "DAYLY_REPORT"
      }
    ]

    const expectedPageInfo = [
      {
          "url": "https://www.mhlw.go.jp/stf/newpage_10264.html",
          "text": "新型コロナウイルスに関連した患者等の発生について(3月17日公表分) ",
          "type": "DAYLY_REPORT"
      },
    ]

    expect(covid19data.extractWillScrapePageInfo(allPageInfo, didScrapePageInfo)).toEqual(expectedPageInfo)

  })
})
