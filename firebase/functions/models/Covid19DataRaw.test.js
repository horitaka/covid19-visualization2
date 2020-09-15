const covid19dataRaw = require('./Covid19DataRaw')
// const covid19dataRaw = Covid19DataRaw.getInstance()

describe('Covid19Data-mergeDuplicatePrefecture', () => {
  it('return merged data', () => {
    const inputData = [{
        "date": "20200315",
        "prefectureCode": "15",
        "prefecture": "新潟県",
        "city": "新潟市",
        "noSymptomsPeople": 0,
        "deadPeople": 0,
        "positivePeople": 2,
        "injectedPeople": 0,
        "totalInjectedPeople": 2,
      },
      {
        "date": "20200315",
        "prefectureCode": "01",
        "prefecture": "北海道",
        "city": "",
        "noSymptomsPeople": 0,
        "deadPeople": 0,
        "positivePeople": 0,
        "injectedPeople": 4,
        "totalInjectedPeople": 4,
      },
      {
        "date": "20200315",
        "prefectureCode": "01",
        "prefecture": "北海道",
        "city": "札幌市",
        "noSymptomsPeople": 1,
        "deadPeople": 0,
        "positivePeople": 3,
        "injectedPeople": 2,
        "totalInjectedPeople": 6,
      },
      {
        "date": "20200315",
        "prefectureCode": "14",
        "prefecture": "神奈川県",
        "city": "相模原市",
        "noSymptomsPeople": 1,
        "deadPeople": 3,
        "positivePeople": 0,
        "injectedPeople": 3,
        "totalInjectedPeople": 4,
      },
      {
        "date": "20200315",
        "prefectureCode": "14",
        "prefecture": "神奈川県",
        "city": "",
        "noSymptomsPeople": 0,
        "deadPeople": 0,
        "positivePeople": 0,
        "injectedPeople": 1,
        "totalInjectedPeople": 1,
      },
    ]

    const expectedData = [{
        "date": "20200315",
        "prefectureCode": "15",
        "prefecture": "新潟県",
        "city": "",
        "noSymptomsPeople": 0,
        "deadPeople": 0,
        "positivePeople": 2,
        "injectedPeople": 0,
        "totalInjectedPeople": 2,
      },
      {
        "date": "20200315",
        "prefectureCode": "01",
        "prefecture": "北海道",
        "city": "",
        "noSymptomsPeople": 1,
        "deadPeople": 0,
        "positivePeople": 3,
        "injectedPeople": 6,
        "totalInjectedPeople": 10,
      },
      {
        "date": "20200315",
        "prefectureCode": "14",
        "prefecture": "神奈川県",
        "city": "",
        "noSymptomsPeople": 1,
        "deadPeople": 3,
        "positivePeople": 0,
        "injectedPeople": 4,
        "totalInjectedPeople": 5,
      },
    ]
    expect(covid19dataRaw.mergeDuplicatePrefecture(inputData)).toEqual(expectedData)
  })
})

describe('Covid19Data-calculateTotalInjectedPeople', () => {
  it('return merged data', () => {
    const inputData = [{
        "date": "20200315",
        "prefectureCode": "15",
        "prefecture": "新潟県",
        "city": "",
        "noSymptomsPeople": 0,
        "deadPeople": 0,
        "positivePeople": 2,
        "injectedPeople": 0
      },
      {
        "date": "20200315",
        "prefectureCode": "01",
        "prefecture": "北海道",
        "city": "",
        "noSymptomsPeople": 1,
        "deadPeople": 0,
        "positivePeople": 3,
        "injectedPeople": 6
      },
      {
        "date": "20200315",
        "prefectureCode": "14",
        "prefecture": "神奈川県",
        "city": "",
        "noSymptomsPeople": 1,
        "deadPeople": 3,
        "positivePeople": 0,
        "injectedPeople": 4
      },
    ]

    const expectedData = [{
        "date": "20200315",
        "prefectureCode": "15",
        "prefecture": "新潟県",
        "city": "",
        "injectedPeople": 0,
        "noSymptomsPeople": 0,
        "positivePeople": 2,
        "deadPeople": 0,
        "totalInjectedPeople": 2,
      },
      {
        "date": "20200315",
        "prefectureCode": "01",
        "prefecture": "北海道",
        "city": "",
        "injectedPeople": 6,
        "noSymptomsPeople": 1,
        "positivePeople": 3,
        "deadPeople": 0,
        "totalInjectedPeople": 10,
      },
      {
        "date": "20200315",
        "prefectureCode": "14",
        "prefecture": "神奈川県",
        "city": "",
        "injectedPeople": 4,
        "noSymptomsPeople": 1,
        "positivePeople": 0,
        "deadPeople": 3,
        "totalInjectedPeople": 5,
      },
    ]

    const receivedData = covid19dataRaw.calculateTotalInjectedPeople(inputData)
    expect(receivedData).toEqual(expectedData)
  })
})
