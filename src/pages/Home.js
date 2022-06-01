import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CurtainReveal from '../components/ui/atoms/CurtainReveal'
import Text from '../components/ui/atoms/Text'
import GameLayout from '../components/usecases/GameLayout'
import WithLayout from '../hocs/WithLayout'
import { Modal } from 'react-responsive-modal'
import Container from '../components/ui/layouts/Container'
import Input from '../components/ui/atoms/Input'
import { setUserName } from '../store/redux/actions/user'
import Button from '../components/ui/atoms/Button'
import classNames from 'classnames'

const Home = () => {
  const { userName } = useSelector((state) => state.user)
  const [userNameInput, setUserNameInput] = useState(userName)
  const dispatch = useDispatch()

  const handleChangeUserNameInput = (e) => {
    const {
      target: { value },
    } = e
    setUserNameInput(value)
  }

  const isValidUserName = (userNameProp = userName) => {
    if (!userNameProp) return false

    const isValid = userNameProp.length >= 5
    return isValid
  }

  const handleChangeUserName = () => {
    const isValid = isValidUserName(userNameInput)

    if (!isValid) return

    dispatch(setUserName(userNameInput))
  }

  return (
    <Fragment>
      <Modal open={!isValidUserName()}>
        <Container>
          <Container className={classNames('flex', 'justify-center')}>
            <Text weight={6}>Set your userName!</Text>{' '}
          </Container>

          <Container className={classNames('flex', 'justify-center')}>
            <Input
              ariaLabel="userName"
              name="userName"
              placeholder="Min 5 characters..."
              defaultValue={userNameInput}
              onChange={handleChangeUserNameInput}
            />
          </Container>

          <Container className={classNames('flex', 'justify-center')}>
            <Button onClick={handleChangeUserName}>Set Username!</Button>
          </Container>
        </Container>
      </Modal>

      <CurtainReveal revealCheck={() => true} isRevealed={false}>
        <GameLayout />
      </CurtainReveal>
    </Fragment>
  )
}

export default WithLayout()(Home)
