
import { RECEIVE_DECKS, GET_DECKS } from '../actions';

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
      case GET_DECKS:
        return {
          ...state
        }
    default:
      return state;

  }
}
