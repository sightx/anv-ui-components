import React, { useState } from 'react'
import { boolean, text } from '@storybook/addon-knobs'
import Checkbox from './Checkbox'
import { centerDecorator } from '../../utils/storybook/decorators'
import styles from '../../storybook/index.module.scss'

export default {
  title: 'User Inputs/Checkbox',
  component: Checkbox,
  decorators: [centerDecorator],
}

export const Basic = () => {
  const [isChecked, setChecked] = useState(false)
  const [isIndeterminate, setIndeterminate] = useState(false)
  const onChange = ({ target }) => {
    setChecked(target.checked)
    setIndeterminate(target.indeterminate)
  }

  return (
    <>
      <Checkbox
        indeterminate={isIndeterminate}
        checked={isChecked}
        onChange={onChange}
        id='checkbox-example'
      />
      <label htmlFor='checkbox-example' className={styles.checkboxLabel}>
        Check me out!
      </label>
    </>
  )
}

export const states = () => (
  <>
    <Checkbox className={styles.microMargin} checked />
    <Checkbox className={styles.microMargin} />
    <Checkbox className={styles.microMargin} checked disabled />
    <Checkbox className={styles.microMargin} indeterminate />
    <Checkbox className={styles.microMargin} disabled />
    <Checkbox className={styles.microMargin} view />
  </>
)

export const playground = () => (
  <>
    <Checkbox
      indeterminate={boolean('indeterminate', false)}
      checked={boolean('checked', false)}
      disabled={boolean('disabled', false)}
      id='checkbox-playground'
    />
    <label htmlFor='checkbox-playground' className={styles.checkboxLabel}>
      {text('Label text', 'Hit me!')}
    </label>
  </>
)
