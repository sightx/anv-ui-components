import React from 'react'
import propTypes from 'prop-types'
import styles from './Example.module.scss'

const Example = ({ extraText, className }) => {
  return (
    <h1 className={`${className} ${styles.justSomeClass}`}>
      Hello World
      <p>{extraText}</p>
    </h1>
  )
}

Example.propTypes = {
  /** Custom class */
  className: propTypes.string,
  /** Add text to the component */
  extraText: propTypes.string
}

export default Example
