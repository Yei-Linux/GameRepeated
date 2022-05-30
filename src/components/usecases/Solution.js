import classNames from 'classnames'
import { settings } from '../../constants/settings'
import Container from '../ui/layouts/Container'
import Postit from './Postit'

const { postitSize } = settings
const Solution = () => {
  return (
    <Container className={classNames('flex', 'gap-1', 'justify-center')}>
      {Array.apply(undefined, new Array(postitSize)).map((_, index) => (
        <Postit
          ariaLabel={`${index}`}
          key={index}
          theme="readonly"
          readonly={false}
          name={`${index}`}
        />
      ))}
    </Container>
  )
}

export default Solution
