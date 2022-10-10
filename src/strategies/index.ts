import { UseState } from './useState'
import { UseReducer } from './useReducer'
import { UseContext } from './useContext'
import { UseSignal } from './useSignal'

export const strategies = [
  { name: 'useState', component: UseState },
  { name: 'useReducer', component: UseReducer },
  { name: 'useContext', component: UseContext },
  { name: 'useSignal', component: UseSignal }
]
