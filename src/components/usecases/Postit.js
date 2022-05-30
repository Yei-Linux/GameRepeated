import { Fragment } from 'react'
import classNames from 'classnames'
import Container from '../ui/layouts/Container'
import FormItem from '../ui/atoms/FormItem'
import { useExerciseStore } from '../../hooks/useExerciseStore'

const Postit = ({
  text,
  theme = 'primary',
  readonly = true,
  name,
  htmlFor,
  ariaLabel,
}) => {
  const { solution, setSolution } = useExerciseStore()

  return (
    <Fragment>
      {readonly && text !== undefined && (
        <Container
          testId="postitReadonly"
          className={classNames(
            'postit',
            'postit--dimensions',
            `postit--${theme}`,
            'postit--readonly'
          )}
        >
          {text}
        </Container>
      )}
      {!readonly && (
        <FormItem
          testId="postitNotReadonly"
          htmlFor={htmlFor}
          ariaLabel={ariaLabel}
          value={solution[name]}
          name={name}
          onChange={({ value }) => {
            setSolution(value, name)
          }}
          className={classNames('postit--notreadonly')}
          classNameInput={classNames(
            'postit--dimensions',
            'postit__inputnumber--dimensions'
          )}
        />
      )}
    </Fragment>
  )
}

export default Postit
