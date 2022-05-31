import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { setToggleStartGame } from '../../store/redux/actions/game'
import Button from '../ui/atoms/Button'
import Text from '../ui/atoms/Text'
import Container from '../ui/layouts/Container'

const GameSettings = () => {
  const dispatch = useDispatch()

  const toggleGame = () => dispatch(setToggleStartGame())

  return (
    <Container>
      <Text>How do you want to play this time? 😀</Text>
      <Container className={classNames('flex', 'justify-center')}>
        <Button onClick={() => toggleGame()}>Start Game</Button>
      </Container>
    </Container>
  )
}

export default GameSettings
