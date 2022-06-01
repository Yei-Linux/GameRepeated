import React, { Fragment, useState } from 'react'
import classNames from 'classnames'
import Container from './Container'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import Select from '../atoms/Select'
import { useDispatch, useSelector } from 'react-redux'
import {
  setGameType,
  setToggleStartGame,
} from '../../../store/redux/actions/game'
import { settings } from '../../../constants/settings'

import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import { useToggle } from '../../../hooks/useToggle'
import { useExerciseStore } from '../../../hooks/useExerciseStore'

const imgBasePath = 'https://i.imgur.com/LKLKOEK.png'
const { types } = settings

const Topbar = () => {
  const [gameTempSelected, setGameTempSelected] = useState(null)
  const { setIsVisibleQuestion, setExercise } = useExerciseStore()
  const { toggle, handleToggle } = useToggle()
  const { type } = useSelector((state) => state.game)
  const dispatch = useDispatch()

  const handleChangeGameType = () => {
    if (!gameTempSelected) return
    dispatch(setGameType(gameTempSelected))
    dispatch(setToggleStartGame(false))
    setExercise([])
    setIsVisibleQuestion(true)
    setGameTempSelected(null)
    handleToggle(false)
  }

  const handleSelectGameType = (e) => {
    const {
      target: { value },
    } = e

    setGameTempSelected(value)
    handleToggle(true)
  }

  const handleCloseModal = () => {
    setGameTempSelected(null)
    handleToggle(false)
  }

  return (
    <Fragment>
      <Modal open={toggle} onClose={handleCloseModal}>
        <Container>
          <Container>
            <Text as="h3" weight={6}>
              Are you sure do you want to change the type of game?
            </Text>
          </Container>

          <Container>
            <Text>If you do this , your current progress will be reseted</Text>
          </Container>

          <Container className={classNames('flex', 'justify-center')}>
            <Button onClick={handleChangeGameType}>Change!</Button>
          </Container>
        </Container>
      </Modal>

      <Container
        className={classNames('flex', 'justify-between', 'h-100', 'topbar')}
      >
        <Container
          padding={0}
          className={classNames(
            'flex',
            'items-center',
            'gap-1',
            'topbar__brand'
          )}
        >
          <img
            src={imgBasePath}
            alt="logoRepeated"
            width="30px"
            height="30px"
          />
          <Text as="p" weight={7} className={classNames('topbar__brandtitle')}>
            REPEATED
          </Text>
        </Container>
        <Container
          padding={0}
          className={classNames('flex', 'justify-around', 'gap-2')}
        >
          <Container
            padding={0}
            className={classNames(
              'flex',
              'justify-center',
              'items-center',
              'flex-col',
              classNames('topbar__item')
            )}
          >
            <Text as="p" weight={7} className={classNames('topbar__text')}>
              Type:
            </Text>
          </Container>
          <Container
            padding={0}
            className={classNames(
              'flex',
              'justify-center',
              'items-center',
              'flex-col',
              'topbar__item'
            )}
          >
            <Select
              defaultValue={type}
              name="gameType"
              options={types.map((type) => ({ value: type, label: type }))}
              onChange={handleSelectGameType}
            />
          </Container>
        </Container>
      </Container>
    </Fragment>
  )
}

export default Topbar
