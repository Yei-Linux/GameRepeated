import Container from '../ui/layouts/Container'
import Exercise from './Exercise'
import Solution from './Solution'
import Button from '../ui/atoms/Button'
import classNames from 'classnames'
import { useExerciseStore } from '../../hooks/useExerciseStore'
import { Fragment, useState } from 'react'
import { useSolution } from '../../hooks/useSolution'

const GameForm = () => {
  const {
    exercise,
    solution,
    waitMs,
    isVisibleQuestion,
    setIsVisibleQuestion,
  } = useExerciseStore()
  const [toggle, setTogle] = useState(false)

  const { handleCompleted } = useSolution({
    exercise,
    solution,
    waitMs,
    setIsVisibleQuestion: (value) => {
      setTogle(true)
      setIsVisibleQuestion(value)
    },
  })

  return (
    <Container>
      <Container>
        {!toggle ? 'Read the exercise' : 'Set your solution'}
      </Container>
      {isVisibleQuestion ? (
        <Exercise />
      ) : (
        <Fragment>
          <Solution />
          <Container className={classNames('flex', 'justify-center')}>
            <Button onClick={handleCompleted}>Completed</Button>
          </Container>
        </Fragment>
      )}
    </Container>
  )
}

export default GameForm
