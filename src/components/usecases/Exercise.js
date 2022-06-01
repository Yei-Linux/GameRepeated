import classNames from 'classnames'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { settings } from '../../constants/settings'
import { useExercise } from '../../hooks/useExercise'
import { useExerciseStore } from '../../hooks/useExerciseStore'
import Container from '../ui/layouts/Container'
import Postit from './Postit'

const { postitSize } = settings

const Exercise = () => {
  const { type } = useSelector((state) => state.game)
  const { exercise, setExercise } = useExerciseStore()

  useExercise({
    postitSize,
    exerciseType: type,
    done: setExercise,
  })

  return (
    <Fragment>
      {exercise && !!exercise.length && (
        <Container
          testId="exercises-container"
          className={classNames('flex', 'gap-1', 'justify-center')}
        >
          {exercise.map((item, index) => (
            <Postit key={index} text={item} />
          ))}
        </Container>
      )}
    </Fragment>
  )
}

export default Exercise
