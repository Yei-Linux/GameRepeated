import { useEffect } from 'react'
import dataHelper from '../helpers/data'
import exerciseService from '../services/exercise'

export const useExercise = ({ postitSize, exerciseType, done }) => {
  const buildNumberExercise = () => {
    const numbers = Array.apply(undefined, new Array(postitSize)).map(() =>
      dataHelper.getRandomNumber()
    )

    return numbers
  }

  const buildWordExercise = async () => {
    const words = await exerciseService.fetchWordRandom()

    return words
  }

  const buildCountries = async () => {
    const countries = await exerciseService.fetchCountries()

    const countriesArr = Object.entries(countries).reduce(
      (acc, currentValue) => {
        const [, value] = currentValue
        const { country } = value
        return [...acc, ...[country]]
      },
      []
    )

    return countriesArr.slice(0, 5)
  }

  const buildNames = async () => {
    const names = await exerciseService.fetchNames()

    return names
  }

  const buildExercise = async () => {
    if (exerciseType === 'numbers') {
      const items = buildNumberExercise()
      return items
    }

    if (exerciseType === 'countries') {
      const items = await buildCountries()
      return items
    }

    if (exerciseType === 'names') {
      const items = await buildNames()
      return items
    }

    if (exerciseType === 'words') {
      const items = await buildWordExercise()
      return items
    }
  }

  const handler = async () => {
    const result = await buildExercise()

    if (!result) return

    done(result)
  }

  useEffect(() => {
    handler()
  }, [])

  return { handler, buildExercise }
}
