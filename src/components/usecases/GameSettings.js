import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { settings } from '../../constants/settings'
import { useExerciseStore } from '../../hooks/useExerciseStore'
import { setToggleStartGame } from '../../store/redux/actions/game'
import Button from '../ui/atoms/Button'
import Select from '../ui/atoms/Select'
import Text from '../ui/atoms/Text'
import Container from '../ui/layouts/Container'

const { times } = settings

const GameSettings = () => {
  const { waitMs, setWaitMs } = useExerciseStore()

  const dispatch = useDispatch()

  const toggleGame = () => dispatch(setToggleStartGame())

  const handleChangeTime = (e) => {
    const {
      target: { value },
    } = e

    setWaitMs(value)
  }

  return (
    <Container>
      <Text as="h3" weight={6}>
        How fast do you want to play this time? 😀
      </Text>
      <Container className={classNames('flex', 'justify-center')}>
        <Select
          defaultValue={waitMs}
          name="gameType"
          options={times.map((time) => ({ value: time, label: time }))}
          onChange={handleChangeTime}
        />
      </Container>
      <Container className={classNames('flex', 'justify-center')}>
        <Button onClick={() => toggleGame()}>Start Game</Button>
      </Container>
    </Container>
  )
}

export default GameSettings
