import { useReducer, useRef } from 'react'
import { actionTypes, actions } from './actions'

const initialState = {
  headers: [],
  data: [],
  withRowActions: false,
  sort: {
    sortable: false,
    sortBy: {
      field: null,
      order: null,
    },
  },
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_HEADERS:
      return { ...state, headers: action.payload }
    case actionTypes.SET_DATA:
      return { ...state, data: [...action.payload] }
    case actionTypes.SET_WITH_ROW_ACTIONS:
      return { ...state, withRowActions: action.payload }
    case actionTypes.SET_SORTABLE:
      return { ...state, sort: { ...state.sort, sortable: action.payload } }
    case actionTypes.SET_SORT_BY:
      return { ...state, sort: { ...state.sort, sortBy: action.payload } }
    default:
      return state
  }
}


export default () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { current: bondedActions } = useRef(actions(dispatch))
  return [
    state,
    bondedActions,
  ]
}