import { renderHook } from '@testing-library/react'
import { useExercise } from '../../../hooks/useExercise'
import dataHelper from '../../../helpers/data'
import { act } from 'react-dom/test-utils'
import exerciseService from '../../../services/exercise'

describe('The useExercise hook', () => {
  it('Should build exercise function with numbers type', async () => {
    const exerciseType = 'numbers'
    const postitSize = 5
    const done = jest.fn((value) => value)

    jest
      .spyOn(dataHelper, 'getRandomNumber')
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(2)
      .mockReturnValueOnce(3)
      .mockReturnValueOnce(4)
      .mockReturnValueOnce(5)

    await act(() =>
      renderHook(() =>
        useExercise({
          postitSize,
          exerciseType,
          done,
        })
      )
    )

    expect(done.mock.calls.length).toBe(1)
    expect(done.mock.results[0].value).toStrictEqual([1, 2, 3, 4, 5])
  })

  it('Should build exercise function with countries type', async () => {
    const exerciseType = 'countries'
    const postitSize = 5
    const done = jest.fn((value) => value)

    jest.spyOn(exerciseService, 'fetchCountries').mockReturnValueOnce({
      PER: { country: 'Peru' },
      COL: { country: 'Colombia' },
      CH: { country: 'Chile' },
      MEX: { country: 'Mexico' },
      ARG: { country: 'Argentina' },
    })

    await act(() =>
      renderHook(() =>
        useExercise({
          postitSize,
          exerciseType,
          done,
        })
      )
    )

    expect(done.mock.calls.length).toBe(1)
    expect(done.mock.results[0].value).toStrictEqual([
      'Peru',
      'Colombia',
      'Chile',
      'Mexico',
      'Argentina',
    ])
  })

  it('Should build exercise function with names type', async () => {
    const exerciseType = 'names'
    const postitSize = 5
    const done = jest.fn((value) => value)

    jest
      .spyOn(exerciseService, 'fetchNames')
      .mockReturnValueOnce(['jesus', 'cesar', 'alberto', 'arturo', 'test'])

    await act(() =>
      renderHook(() =>
        useExercise({
          postitSize,
          exerciseType,
          done,
        })
      )
    )

    expect(done.mock.calls.length).toBe(1)
    expect(done.mock.results[0].value).toStrictEqual([
      'jesus',
      'cesar',
      'alberto',
      'arturo',
      'test',
    ])
  })
})
