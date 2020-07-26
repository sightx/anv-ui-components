import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import classNames from 'classnames'
import propTypes from 'prop-types'
import Button from '../Button/Button'
import ChipsInput from '../ChipsInput/ChipsInput'
import Menu from '../Menu/Menu'
import { ReactComponent as FilterIcon } from '../../assets/svg/Filter.svg'
import styles from './SSF.module.scss'

const SmartFilter = ({
  className,
  fields,
  onChange,
  placeholder,
  ...otherProps
}) => {
  const [menuAnchor, setMenuAnchor] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const inputBaseRef = useRef()

  const handleMenuOpen = useCallback(() => setMenuAnchor(inputBaseRef.current), [inputBaseRef])
  const handleMenuClose = useCallback(() => setMenuAnchor(null), [])

  const getChipField = useCallback(chipLabel => {
    const match = fields.find(({ label }) => chipLabel.indexOf(label) === 0)
    return match && match.type
  }, [fields])

  const isValueContainedInField = useCallback(value => {
    return fields.find(({ label }) => label.toLowerCase().indexOf(value.toLowerCase()) === 0)
  }, [fields])

  useEffect(() => {
    if (inputValue && !isValueContainedInField(inputValue)) {
      handleMenuClose()
    }
  }, [inputValue, isValueContainedInField, handleMenuClose, inputBaseRef])

  const handleChipChange = useCallback(chips => {
    const searchQuery = chips.map(chipLabel => {
      const chipField = getChipField(chipLabel)
      return { ...chipField && { field: chipField.field }, value: chipLabel }
    })
    onChange(searchQuery)
  }, [onChange, getChipField])

  const renderChipIcon = ({ label }) => {
    const menuItem = getChipField(label)
    return menuItem && menuItem.icon
  }

  const getInputType = useCallback(value => {
    const menuItem = getChipField(value)
    return menuItem ? menuItem : 'text'
  }, [getChipField])

  const onInputChange = useCallback(value => {
    if (getInputType(value) === 'number') {
      const inputValueOnly = value.slice(value.indexOf(':') + 2)
      if (!Number.isNaN(Number(inputValueOnly))) {
        setInputValue(value)
      }
    } else {
      setInputValue(value)
    }
  }, [setInputValue, getInputType])

  const menuItems = useMemo(() => {
    const menuItems = fields.filter(({ label }) => label.toLowerCase().indexOf(inputValue.toLowerCase()) === 0)
    if(menuItems.length && document.activeElement === inputBaseRef.current) {
      handleMenuOpen()
    } else {
      handleMenuClose()
    }
    return menuItems
  }, [inputValue, fields, handleMenuClose, handleMenuOpen, inputBaseRef])

  const handleButtonClick = useCallback(() => menuAnchor || menuItems.length === 0
    ? setMenuAnchor(null)
    : setMenuAnchor(inputBaseRef.current), [menuAnchor, menuItems.length, inputBaseRef])

  const renderAutoComplete = useMemo(() => {
    const onItemClick = label => {
      setInputValue(`${label}: `)
      handleMenuClose()
      inputBaseRef.current.focus()
    }

    return (
      <Menu
        variant={ 'dense' }
        aria-labelledby="menu-element"
        anchorElement={ menuAnchor }
        isOpen={ !!menuAnchor }
        onClose={ handleMenuClose }
      >
        { menuItems.map(({ label }) => (
          <Menu.Item key={ label } onClick={ () => onItemClick(label) }>{ label }</Menu.Item>
        )) }
      </Menu>
    )
  },[handleMenuClose, menuAnchor, menuItems, inputBaseRef])

  const onInputFocus = useCallback(isFocused => isFocused && menuItems.length ? handleMenuOpen() : handleMenuClose(), [menuItems, handleMenuClose, handleMenuOpen])

  const classes = classNames(
    styles.SmartFilter,
    className,
  )

  return (
    <div className={ classes }>
      <div className={ styles.elevationOverlay }/>
      <Button className={ classNames(styles.searchFilter, menuAnchor && styles.openedMenu) } onClick={ handleButtonClick }>
        <FilterIcon />
      </Button>
      { renderAutoComplete }
      <ChipsInput
        className={ styles.chipInput }
        renderChipIcon={ renderChipIcon }
        placeholder={ placeholder }
        onFocusChange={ onInputFocus }
        onInputChange={ onInputChange }
        inputValue={ inputValue }
        onChange={ handleChipChange }
        onSubmit={ handleMenuOpen }
        ref={ inputBaseRef }
        { ...otherProps }
      />
    </div>
  )
}

SmartFilter.defaultProps = {
  onChange: () => {},
  placeholder: 'Add tag to filter or free type to search',
  fields: [],
}

SmartFilter.propTypes = {
  /** Fields that are going to appear in the search menu:<br />
   *  <code>field</code>     - name of the value of field key that would be returned
   *                           if the user choose this line in the menu.<br />
   *  <code>label</code>     - the name of the menu item that appears.<br />
   *  <code>type</code>      - number or text as the possible input types.<br />
   *  <code>icon</code>      - the icon on the chip that will appear
   *                           if the user choose this line in the menu.
   **/
  fields: propTypes.arrayOf(propTypes.shape({
    field: propTypes.string.isRequired,
    label: propTypes.string.isRequired,
    type: propTypes.oneOf(['text', 'number', 'date']),
    icon: propTypes.element,
  })),
  /** Callback when changed. */
  onChange: propTypes.func,
  /** Default input place holder. */
  placeholder: propTypes.string,
  /** For css customization. */
  className: propTypes.string,
}

export default SmartFilter
