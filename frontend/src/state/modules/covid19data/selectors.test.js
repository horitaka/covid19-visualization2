import { getOldestDate, getLatestDate, getCovid19DataSelectedArea, getCovid19DataOnSelectedDayByArea } from './selectors'

describe('covid19data selectors getOldestDate', () => {
  it('return minDate', () => {
    const state = {
      covid19Data: {
        20200313: [
          {
            areaCode: '13',
            injectedPeople: 20,
          },
          {
            areaCode: '11',
            injectedPeople: 12,
          },
        ],
        20200314: [
          {
            areaCode: '13',
            injectedPeople: 20,
          },
          {
            areaCode: '11',
            injectedPeople: 12,
          },
        ],
      }
    }
    const expectedValue = '20200313'

    expect(getOldestDate(state)).toBe(expectedValue)
  })
})

describe('covid19data selectors getLatestDate', () => {
  it('return maxDate', () => {
    const state = {
      covid19Data: {
        20200313: [
          {
            areaCode: '13',
            injectedPeople: 20,
          },
          {
            areaCode: '11',
            injectedPeople: 12,
          },
        ],
        20200314: [
          {
            areaCode: '13',
            injectedPeople: 20,
          },
          {
            areaCode: '11',
            injectedPeople: 12,
          },
        ],
      }
    }
    const expectedValue = '20200314'

    expect(getLatestDate(state)).toBe(expectedValue)
  })
})


describe('covid19data selectors getCovid19DataSelectedArea', () => {
  it('return data', () => {
    const state = {
      covid19Data: {
        20200313: [
          {
            date: "20200313",
            areaCode: "00",
            prefecture: "全国",
            city: "",
            totalInjectedPeople: 4,
            injectedPeople: 2,
            noSymptomsPeople: 2,
            positivePeople: 5,
            deadPeople: 0,
          },
          {
            date: "20200313",
            areaCode: "12",
            prefecture: "千葉県",
            city: "",
            totalInjectedPeople: 3,
            injectedPeople: 1,
            noSymptomsPeople: 2,
            positivePeople: 5,
            deadPeople: 0,
          },
          {
            date: "20200313",
            areaCode: "30",
            prefecture: "和歌山県",
            city: "",
            totalInjectedPeople: 1,
            injectedPeople: 1,
            noSymptomsPeople: 0,
            positivePeople: 0,
            deadPeople: 0,
          },
        ],
        20200314: [
          {
            date: "20200314",
            areaCode: "00",
            prefecture: "全国",
            city: "",
            totalInjectedPeople: 8,
            injectedPeople: 2,
            noSymptomsPeople: 2,
            positivePeople: 3,
            deadPeople: 1,
          },
          {
            date: "20200314",
            areaCode: "14",
            prefecture: "神奈川県",
            city: "",
            totalInjectedPeople: 1,
            injectedPeople: 1,
            noSymptomsPeople: 0,
            positivePeople: 0,
            deadPeople: 0,
          },
          {
            date: "20200314",
            areaCode: "30",
            prefecture: "和歌山県",
            city: "",
            totalInjectedPeople: 7,
            injectedPeople: 1,
            noSymptomsPeople: 2,
            positivePeople: 3,
            deadPeople: 1,
          },
        ],
      }
    }

    //　全国を選択
    const state01 = {
      ...state,
      appState: {
        selectedDate: '20200313',
        selectedArea: '00',
      },
    }
    const expectedValue01 = {
      20200313: {
        date: "20200313",
        areaCode: "00",
        prefecture: "全国",
        city: "",
        totalInjectedPeople: 4,
        injectedPeople: 2,
        noSymptomsPeople: 2,
        positivePeople: 5,
        deadPeople: 0,
      },
      20200314: {
        date: "20200314",
        areaCode: "00",
        prefecture: "全国",
        city: "",
        totalInjectedPeople: 8,
        injectedPeople: 2,
        noSymptomsPeople: 2,
        positivePeople: 3,
        deadPeople: 1,
      },
    }
    expect(getCovid19DataSelectedArea(state01)).toEqual(expectedValue01)

    // データが存在しない日もある場合
    const state02 = {
      ...state,
      appState: {
        selectedDate: '20200313',
        selectedArea: '12',
      },
    }
    const expectedValue02 = {
      20200313: {
        date: "20200313",
        areaCode: "12",
        prefecture: "千葉県",
        city: "",
        totalInjectedPeople: 3,
        injectedPeople: 1,
        noSymptomsPeople: 2,
        positivePeople: 5,
        deadPeople: 0,
      },
    }
    expect(getCovid19DataSelectedArea(state02)).toEqual(expectedValue02)

  })
})


describe('covid19data selectors getCovid19DataOnSelectedDayByArea', () => {
  it('return data', () => {
    const state = {
      covid19Data: {
        20200313: [
          {
            date: "20200313",
            areaCode: "00",
            prefecture: "全国",
            city: "",
            totalInjectedPeople: 4,
            injectedPeople: 2,
            noSymptomsPeople: 2,
            positivePeople: 5,
            deadPeople: 0,
          },
          {
            date: "20200313",
            areaCode: "12",
            prefecture: "千葉県",
            city: "",
            totalInjectedPeople: 3,
            injectedPeople: 1,
            noSymptomsPeople: 2,
            positivePeople: 5,
            deadPeople: 0,
          },
          {
            date: "20200313",
            areaCode: "30",
            prefecture: "和歌山県",
            city: "",
            totalInjectedPeople: 1,
            injectedPeople: 1,
            noSymptomsPeople: 0,
            positivePeople: 0,
            deadPeople: 0,
          },
        ],
        20200314: [
          {
            date: "20200314",
            areaCode: "00",
            prefecture: "全国",
            city: "",
            totalInjectedPeople: 8,
            injectedPeople: 2,
            noSymptomsPeople: 2,
            positivePeople: 3,
            deadPeople: 1,
          },
          {
            date: "20200314",
            areaCode: "14",
            prefecture: "神奈川県",
            city: "",
            totalInjectedPeople: 1,
            injectedPeople: 1,
            noSymptomsPeople: 0,
            positivePeople: 0,
            deadPeople: 0,
          },
          {
            date: "20200314",
            areaCode: "30",
            prefecture: "和歌山県",
            city: "",
            totalInjectedPeople: 7,
            injectedPeople: 1,
            noSymptomsPeople: 2,
            positivePeople: 3,
            deadPeople: 1,
          },
        ],
      }
    }

    //　全国を選択
    const state01 = {
      ...state,
      appState: {
        selectedDate: '20200313',
        selectedArea: '00',
      },
    }
    const expectedValue01 = [
      {
        date: "20200313",
        areaCode: "00",
        prefecture: "全国",
        city: "",
        totalInjectedPeople: 4,
        injectedPeople: 2,
        noSymptomsPeople: 2,
        positivePeople: 5,
        deadPeople: 0,
      }
    ]

    expect(getCovid19DataOnSelectedDayByArea(state01)).toEqual(expectedValue01)

  })
})
