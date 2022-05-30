import { useEffect } from 'react'

export const useExercise = ({ postitSize, exerciseType, done }) => {
  const getRandomNumber = () => Number((Math.random() * 10).toFixed(0))

  const buildNumberExercise = () => {
    const numbers = Array.apply(undefined, new Array(postitSize)).map(() =>
      getRandomNumber()
    )

    done(numbers)
  }

  const fetchWordRandom = async () => {
    try {
      const response = await fetch(
        'https://random-word-api.herokuapp.com/word?number=5'
      )
      const data = await response.json()

      return data
    } catch (error) {
      console.log('Error: ', error.message)
      return []
    }
  }

  const buildWordExercise = async () => {
    const words = await fetchWordRandom()

    done(words)
  }

  const buildExercise = async () => {
    if (exerciseType === 'numbers') {
      buildNumberExercise()
      return
    }

    await buildWordExercise()
  }

  useEffect(() => {
    buildExercise()
  }, [])

  return {}
}
