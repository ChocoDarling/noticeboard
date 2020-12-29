import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const INITIALIZE_USERNAME = 'auth/INITIALIZE_USERNAME';
const LOGIN = 'auth/LOGIN';
const ERRORTEXT = 'auth/ERRORTEXT';
const USERLIST = 'userList';

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  }),
);

export const initializeFrom = createAction(INITIALIZE_FORM);
export const login = createAction(LOGIN, (username) => username);
export const logout = createAction(INITIALIZE_USERNAME);
export const setErrorText = createAction(ERRORTEXT, ({ form, errorText }) => ({
  form,
  errorText,
}));
export const addUserList = createAction(USERLIST, (user) => user);

const initialState = {
  id: 1,
  username: '',
  register: { username: '', password: '', passwordConfirm: '', errorText: '' },
  login: { username: '', password: '', errorText: '' },
};
const uesrListInitialState = [];

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, action) =>
      produce(state, (draft) => {
        draft.login = initialState.login;
        draft.register = initialState.register;
      }),
    [LOGIN]: (state, { payload: username }) =>
      produce(state, (draft) => {
        draft.username = username;
      }),
    [ERRORTEXT]: (state, { payload: { form, errorText } }) =>
      produce(state, (draft) => {
        draft[form].errorText = errorText;
      }),
    [INITIALIZE_USERNAME]: (state, action) =>
      produce(state, (draft) => {
        draft.username = initialState.username;
      }),
  },
  initialState,
);

export const userList = handleActions(
  {
    [USERLIST]: (state, { payload: user }) =>
      produce(state, (draft) => {
        draft.push(user);
      }),
  },
  uesrListInitialState,
);

export default auth;