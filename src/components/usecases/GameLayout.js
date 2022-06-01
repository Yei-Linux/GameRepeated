import classNames from 'classnames'
import { useSelector } from 'react-redux'
import Container from '../ui/layouts/Container'
import Text from '../ui/atoms/Text'
import GameForm from './GameForm'
import GameSettings from './GameSettings'

const GameLayout = () => {
  const { isStartGame, type } = useSelector((state) => state.game)

  return (
    <Container
      padding={0}
      className={classNames(
        'flex',
        'justify-center',
        'items-center',
        'flex-col',
        'h-100'
      )}
    >
      <Container padding={0} className={classNames('flex', 'justify-center')}>
        <Text css={{ fontSize: '12px' }}>Game Type Selected: {type}</Text>
      </Container>

      <Container padding={0} className={classNames('flex', 'justify-center')}>
        {isStartGame && <GameForm />}
        {!isStartGame && <GameSettings />}
      </Container>
    </Container>
  )
}

export default GameLayout
