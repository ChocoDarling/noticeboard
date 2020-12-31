import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_FIELD = 'commentList/CHANGE_FIELD';
const INITIALIZE_FORM = 'commentList/INITIALIZE_FORM';

export const changeField = createAction(CHANGE_FIELD, ({ name, data }) => ({
  name,
  data,
}));

export const initializeFrom = createAction(INITIALIZE_FORM);

const initialState = {
  fullPage: 0,
  commentCount: 0,
  nowPageNum: 0,
  nowList: [],
};

const commentList = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { name, data } }) =>
      produce(state, (draft) => {
        draft[name] = data;
      }),
    [INITIALIZE_FORM]: (state, action) =>
      produce(state, (draft) => {
        draft.nowPageNum = initialState.nowPageNum;
        draft.nowList = initialState.nowList;
      }),
  },
  initialState,
);

export default commentList;
