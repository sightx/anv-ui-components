import React from 'react'
import { action } from '@storybook/addon-actions'
import { select, text } from '@storybook/addon-knobs'
import ChipsInput from './ChipsInput'
import { ReactComponent as EyeEnabled } from '../../assets/svg/EyeEnabled.svg'
import { ReactComponent as ArrowSolidRight } from '../../assets/svg/ArrowSolidRight.svg'
import { ReactComponent as Filter } from '../../assets/svg/Filter.svg'
import { centerDecorator } from '../../utils/storybook/decorators'
import styles from '../../styles/storybook/index.module.scss'

const mockInitialData = [
  { label: 'first' },
  { label: 'second' },
  { label: 'third with icon', icon: <ArrowSolidRight /> }
]

export default {
  title: 'Components/ChipsInput',
  component: ChipsInput,
  decorators: [centerDecorator],
}

export const Default = () => (
  <ChipsInput
    onChanged={ action('Chips Changed Result') }
    onInputChanged={ action('Input Changed Result') }
    onFocusChanged={ action('Input Focus Changed Result') }
  />
)

export const initialValues = () => (
  <ChipsInput
    defaultChipValues={ mockInitialData }
    defaultInputValue={ 'foo' }
    onChanged={ action('Chips Changed Result') }
    onInputChanged={ action('Input Changed Result') }
    onFocusChanged={ action('Input Focus Changed Result') }
  />
)

export const placeHolder = () => (
  <ChipsInput
    placeholder={ 'Custom place holder' }
    onChanged={ action('Chips Changed Result') }
    onInputChanged={ action('Input Changed Result') }
    onFocusChanged={ action('Input Focus Changed Result') }
  />
)

export const getIconHandler = () => {
  const renderChipIcon = chip => {
    const { label } = chip
    if(label === 'first') return <EyeEnabled />
    if(label === 'second') return <ArrowSolidRight />
    return <Filter />
  }

  return (
    <div className={ styles.flexColumn }>
      <span className={ styles.marginFlexContainer }>
        Insert <b>first</b> for <b>Eye</b> icon, <b>second</b> for <b>Arrow</b> icon and everything else for <b>Filter</b> icon
      </span>
      <ChipsInput
        renderChipIcon={ renderChipIcon }
        onChanged={ action('Chips Changed Result') }
        onInputChanged={ action('Input Changed Result') }
        onFocusChanged={ action('Input Focus Changed Result') }
      />
    </div>
  )
}

export const playGround = () => {
  const selectOptions = {
    noValues: 1,
    withValues: 2
  }
  const valueSelection = select('initial values', selectOptions, selectOptions.noValues)
  const values = selectOptions.withValues === valueSelection ? mockInitialData : []

  return (
    <ChipsInput
      onChanged={ action('Chips Changed Result') }
      onInputChanged={ action('Input Changed Result') }
      onFocusChanged={ action('Input Focus Changed Result') }
      defaultInputValue={ select('Initial input value', { initialInputValue: 'Initial Value', emptyValue: '' }, '') }
      defaultChipValues={ values }
      placeholder={ text('text', 'Place holder') }
    />)
}
