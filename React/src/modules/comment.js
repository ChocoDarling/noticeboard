import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_FIELD = 'comment/CHANGE_FIELD';
const INITIALIZE_FORM = 'comment/INITIALIZE_FORM';

export const changeField = createAction(CHANGE_FIELD, ({ name, data }) => ({
  name,
  data,
}));

export const initializeFrom = createAction(INITIALIZE_FORM);

const initialState = {
  title: '',
  text: '',
};

const comment = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { name, data } }) =>
      produce(state, (draft) => {
        draft[name] = data;
      }),
    [INITIALIZE_FORM]: (state, action) =>
      produce(state, (draft) => {
        draft.title = initialState.title;
        draft.text = initialState.text;
        draft.errorText = initialState.errorText;
      }),
  },
  initialState,
);

export default comment;
