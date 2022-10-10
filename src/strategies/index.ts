import { UseReducer } from "./useReducer";
import { UseSignal } from "./useSignal";
import { UseState } from "./useState";

export const strategies = [
  { name: 'useState', component: UseState },
  { name: 'useReducer', component: UseReducer },
  { name: 'useSignal', component: UseSignal },
]
