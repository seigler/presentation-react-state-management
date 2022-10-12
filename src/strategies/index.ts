import { TodoUseState } from './todoUseState'
import { TodoUseReducer } from './todoUseReducer'
import { TodoUseContext } from './todoUseContext'
import { TodoSignal } from './todoSignal'

export const strategies = [
  { name: 'useState', component: TodoUseState },
  { name: 'useReducer', component: TodoUseReducer },
  { name: 'useContext', component: TodoUseContext },
  { name: 'signals', component: TodoSignal }
]
