import { useEffect } from 'react'
import {
  fetchCountries,
  fetchNames,
  fetchWordRandom,
} from '../services/exercise'

export const useExercise = ({ postitSize, exerciseType, done }) => {
  const getRandomNumber = () => Number((Math.random() * 10).toFixed(0))

  const buildNumberExercise = () => {
    const numbers = Array.apply(undefined, new Array(postitSize)).map(() =>
      getRandomNumber()
    )

    done(numbers)
  }

  const buildWordExercise = async () => {
    const words = await fetchWordRandom()

    done(words)
  }

  const buildCountries = async () => {
    const countries = await fetchCountries()

    const countriesArr = Object.entries(countries).reduce(
      (acc, currentValue) => {
        const [, value] = currentValue
        const { country } = value
        return [...acc, ...[country]]
      },
      []
    )

    done(countriesArr.slice(0, 5))
  }

  const buildNames = async () => {
    const names = await fetchNames()

    done(names)
  }

  const buildExercise = async () => {
    if (exerciseType === 'numbers') {
      buildNumberExercise()
      return
    }

    if (exerciseType === 'countries') {
      await buildCountries()
      return
    }

    if (exerciseType === 'names') {
      await buildNames()
      return
    }

    if (exerciseType === 'words') {
      await buildWordExercise()
      return
    }
  }

  useEffect(() => {
    buildExercise()
  }, [])

  return {}
}
