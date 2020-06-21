const GET_PRODUCTS = '@@GET_PRODUCTS'
const ADD_TO_SELECTION = 'ADD_TO_SELECTION'
const REMOVE_FROM_SELECTION = 'REMOVE_FROM_SELECTION'
const GET_RATES = '@@GET_RATES'
const SET_STATUS = 'SET_STATUS'
const SET_BASE = 'SET_BASE'

const initialState = {
  list: [],
  selection: {},
  rates: {},
  base: '',
  basket: [],
  status: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_STATUS:
      return {...state, status: action.status }
    case ADD_TO_SELECTION:
      return {
        ...state,
        selection: {
          ...state.selection,
          [action.id]: (state.selection[action.id] || 0) + 1
        },
        basket: {
          ...state.basket, [action.id]: action.basket
        }
      }

    case REMOVE_FROM_SELECTION: {
      const newSelection = {
        ...state.selection,
        [action.id]: state.selection[action.id] - 1
      }
      if (newSelection[action.id] <= 0) {
        delete newSelection[action.id]
      }
      return {
        ...state,
        selection: newSelection
      }
    }

    case SET_BASE:
      return { ...state, base: action.base }

    case GET_RATES:
      return { ...state, ...action.rates }

    case GET_PRODUCTS:
      return { ...state, list: action.list }
    default:
      return state
  }
}


export function addSelection(id, basket) {
  return { type: ADD_TO_SELECTION, id, basket }
}

export function removeSelection(id) {
  return { type: REMOVE_FROM_SELECTION, id }
}
export function setBase(base) {
  return { type: SET_BASE, base }
}
export function setStatus(status) {
  return { type: SET_STATUS,status }
}

export function sortedList(arr, key) {
  switch(key) {
    case 'price':
      return arr.sort((a, b) => b.price - a.price)
    case 'title':
      return arr.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1
        return 0
      })

    default: return arr
  }

}



export function getRates() {
  return (dispatch) => {
    fetch('/api/v1/rates')
      .then((res) => res.json())
      .then((rates) => {
        dispatch({ type: GET_RATES, rates })
      })
  }
}
export function getProducts() {
  return (dispatch) => {
    fetch('/api/v1/products')
      .then(res => res.json())
      .then(list => {
        dispatch({ type: GET_PRODUCTS, list })
      })
  }
}