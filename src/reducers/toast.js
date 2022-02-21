/* eslint-disable prettier/prettier */


export default function toasts(state = [], { type, ...rest }) {
  switch (type) {
    case 'ADD_TOAST': {
      return [
        ...state,
        rest,
      ]
    }
    default:
      return state;
  }
}