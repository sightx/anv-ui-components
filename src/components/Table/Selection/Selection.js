import React, { useContext, useEffect, } from 'react'
import propTypes from 'prop-types'
import classNames from 'classnames'
import { Portal, Animations, Checkbox, } from '../../../index'
import TableContext from '../TableContext'
import styles from './Selection.module.scss'
import { useTableData } from "../UseTableData"
import { BulkAction } from "./BulkAction"

const Selection = ({
  onChange,
  selected,
  bulkActions,
  selectBy,
  className,
  withSelectionBar,
}) => {
  const { state, setSelectionActivity, setSelection, deselectAll } = useContext(TableContext)
  const { totalItems } = state
  const { items, excludeMode } = state.selection
  const tableData = useTableData()

  //For data changes we need to make sure that the selected items are
  // contained within the new data
  useEffect(() => {
    const newItems = items.filter(item => !!tableData.find(item2 => item === item2[selectBy]))
    const newExcludeMode = tableData.length ? excludeMode : false
    onChange && onChange({ excludeMode, items: newItems })
    setSelection({ excludeMode: newExcludeMode, items: newItems })
    // the logic don't need items and excludeMode in deps array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[setSelection, onChange, tableData])

  useEffect(() => {
    selected && setSelection(selected)
  }, [selected, setSelection])

  useEffect(() => {
    onChange && onChange({ excludeMode, items })
  }, [items, onChange, excludeMode])

  useEffect(() => {
    setSelection({ excludeMode: false, items: [] })
  }, [setSelection, state.filters])

  useEffect(() => {
    setSelectionActivity(true, selectBy)
  }, [setSelectionActivity, selectBy])

  const renderActions = () => {

    return (
      <div className={ styles.actionsContainer }>
        {
          bulkActions.map(({ icon, onClick, subMenu, confirmMessage }, index)=> (
            <BulkAction
              icon={ icon }
              onClick={ onClick }
              subMenu={ subMenu }
              confirmMessage={ confirmMessage }
              key={ index }
            />
          ))
        }
      </div>
    )
  }
  const handleDeselectAll = () => {
    deselectAll()
  }
  const renderBar = withSelectionBar && (excludeMode || !!items.length)
  const selectedCount = renderBar && (excludeMode ? totalItems - items.length : items.length)
  const classes = classNames(
    styles.selectionBar,
    className,
  )

  return (
    <Animations.Scale isOpen={ renderBar }>
      <Portal containerId={ 'table-selection-bar' }>
        <div className={ classes }>
          <Checkbox
            indeterminate
            onChange={ handleDeselectAll }
          />
          <div className={ styles.countContainer }>
            <span className={ styles.counter }>{ selectedCount }</span>
            <span className={ styles.counterLabel }>Items Selected</span>
          </div>
          { renderActions() }
        </div>
      </Portal>
    </Animations.Scale>
  )
}

Selection.defaultProps = {
  onChange: () => {},
  bulkActions: [],
  selectBy: 'id',
  withSelectionBar: true,
}

Selection.propTypes = {
  /** Callback fire when selection changed. */
  onChange: propTypes.func,
  /** Selected items object. (For controlled selection). */
  selected: propTypes.arrayOf(
    propTypes.shape({
      items: propTypes.array,
      excludeMode: propTypes.bool
    })
  ),
  /** Table bulk actions. <br />
   *  <code>icon</code>             - icon for the action. <br />
   *  <code>label</code>            - label for the action icon.<br />
   *  <code>submenu</code>          - submenu for the action icon.<br />
   *  <code>confirmMessage</code>   - if pass confirmation dialog will show after click the action. <br />
   *  <code>onClick</code>          - callback fire when action click. <br />
   **/
  bulkActions: propTypes.arrayOf(
    propTypes.shape({
      icon: propTypes.node,
      subMenu: propTypes.arrayOf(
        propTypes.shape({
          icon: propTypes.node,
          label: propTypes.string,
          onClick: propTypes.func.isRequired,
          confirmMessage: propTypes.string
        })),
      label: propTypes.string,
      onClick: propTypes.func,
      confirmMessage: propTypes.string
    })
  ).isRequired,
  /** The selection evaluate by this prop. Set to the id field. */
  selectBy: propTypes.string,
  /** Selection bar css customization. */
  className: propTypes.string,
  /** Boolean to show Selection bar. */
  withSelectionBar: propTypes.bool,
}

export default Selection
