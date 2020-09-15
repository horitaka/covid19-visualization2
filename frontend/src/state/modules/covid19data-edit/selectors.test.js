import { getMinDate, getMaxDate } from './selectors'

describe('covid19data selectors getMinDate', () => {
  it('return minDate', () => {
    const state = {
      covid19Data: {
        20200313: [
          {
            prefectureCode: '13',
            injectedPeople: 20,
          },
          {
            prefectureCode: '11',
            injectedPeople: 12,
          },
        ],
        20200314: [
          {
            prefectureCode: '13',
            injectedPeople: 20,
          },
          {
            prefectureCode: '11',
            injectedPeople: 12,
          },
        ],
      }
    }
    const expectedValue = 20200313

    expect(getMinDate(state)).toBe(expectedValue)
  })
})

describe('covid19data selectors getMinDate', () => {
  it('return maxDate', () => {
    const state = {
      covid19Data: {
        20200313: [
          {
            prefectureCode: '13',
            injectedPeople: 20,
          },
          {
            prefectureCode: '11',
            injectedPeople: 12,
          },
        ],
        20200314: [
          {
            prefectureCode: '13',
            injectedPeople: 20,
          },
          {
            prefectureCode: '11',
            injectedPeople: 12,
          },
        ],
      }
    }
    const expectedValue = 20200314

    expect(getMaxDate(state)).toBe(expectedValue)
  })
})
