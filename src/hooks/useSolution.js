import { useEffect } from 'react'

export const useSolution = ({
  exercise,
  solution,
  waitMs,
  setIsVisibleQuestion,
}) => {
  const handleWaitToHideQuestion = () => {
    setTimeout(() => {
      setIsVisibleQuestion(false)
    }, waitMs)
  }

  useEffect(() => {
    handleWaitToHideQuestion()
  }, [])

  const comparison = () => {
    try {
      for (let i = 0; i < exercise.length; i++) {
        const question = exercise[i]
        const value = solution[`${i}`]

        if (value != question) {
          throw new Error('Its incorrect the answer')
        }
      }
    } catch (error) {
      alert(error.message)
    }
  }

  const handleCompleted = () => {
    const isValidSolution = Object.entries(solution).every(
      ([, value]) => value !== ''
    )

    if (!isValidSolution) {
      alert('Its not completed the answer.Please complete your answer.')
      return
    }

    comparison()
  }

  return { handleCompleted }
}
