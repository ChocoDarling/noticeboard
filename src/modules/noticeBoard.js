import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_FIELD = 'noticeBoard/CHANGE_FIELD';
const INITIALIZE_FORM = 'noticeBoard/INITIALIZE_FORM';
const CHANGE_IMAGE = 'noticeBoard/CHANGE_IMAGE';
const ERRORTEXT = 'noticeBoard/ERRORTEXT';
const INPUT = 'noticeBoardList/INPUT';
const REMOVE = 'noticeBoardList/REMOVE';

export const changeField = createAction(CHANGE_FIELD, ({ value }) => ({
  value,
}));

export const initializeFrom = createAction(INITIALIZE_FORM);

export const setErrorText = createAction(ERRORTEXT, (errorText) => errorText);

export const input = createAction(INPUT, ({ text, imgs, username }) => ({
  text,
  imgs,
  username,
}));

export const remove = createAction(REMOVE, ({ id }) => ({ id }));

export const changeImgs = createAction(
  CHANGE_IMAGE,
  (pictureDataURLs) => pictureDataURLs,
);

const initialState = {
  text: '',
  imgs: [],
  username: '',
  errorText: '',
};

const noticeBoardListInitialState = [];

const noticeBoard = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { value } }) =>
      produce(state, (draft) => {
        draft.text = value;
      }),
    [INITIALIZE_FORM]: (state, action) =>
      produce(state, (draft) => {
        draft.text = initialState.text;
        draft.errorText = initialState.errorText;
      }),
    [CHANGE_IMAGE]: (state, { payload: pictureDataURLs }) =>
      produce(state, (draft) => {
        draft.imgs = pictureDataURLs;
      }),
    [ERRORTEXT]: (state, { payload: errorText }) =>
      produce(state, (draft) => {
        draft.errorText = errorText;
      }),
  },
  initialState,
);

export const noticeBoardList = handleActions(
  {
    [INPUT]: (state, { payload: { text, imgs, username } }) =>
      produce(state, (draft) => {
        let id = 0;
        if (draft.length) id = draft[draft.length - 1].id + 1;
        draft.push({ id, text, imgs, username });
      }),
    [REMOVE]: (state, { payload: { id } }) =>
      produce(state, (draft) => {
        const index = draft.findIndex((v) => v.id.toString() === id);
        draft.splice(index, 1);
      }),
  },
  noticeBoardListInitialState,
);

export default noticeBoard;
