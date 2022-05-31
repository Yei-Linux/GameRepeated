import classNames from 'classnames'
import { useSelector } from 'react-redux'
import Container from '../ui/layouts/Container'
import GameForm from './GameForm'
import GameSettings from './GameSettings'

const GameLayout = () => {
  const { isStartGame } = useSelector((state) => state.game)

  return (
    <Container className={classNames('flex', 'justify-center')}>
      {isStartGame && <GameForm />}
      {!isStartGame && <GameSettings />}
    </Container>
  )
}

export default GameLayout
