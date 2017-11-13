export default function battleResult (state = {}, action) {
  switch(action.type) {
    case 'DISPLAY_RESULT':
      return action.payload;
    case 'CLEAR_ALL':
      return {};
    default:
      return state;
  }
}
