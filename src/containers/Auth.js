import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeField,
  initializeFrom,
  addUserList,
  login,
  logout,
  setErrorText,
} from '../modules/auth';
import Auth from '../components/Auth';

function AuthContainer() {
  const dispatch = useDispatch();
  const loginForm = useSelector(({ auth }) => auth.login);
  const registerForm = useSelector(({ auth }) => auth.register);
  const userList = useSelector(({ userList }) => userList);

  function onChange(e) {
    const { value, name } = e.target;
    const form = e.target.parentNode.name;
    dispatch(changeField({ form: form, key: name, value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    if (e.target.name === 'register') {
      if (e.target.password.value !== e.target.passwordConfirm.value) {
        dispatch(setErrorText('비밀번호를 확인해주세요.'));
        return;
      }

      if (userList.find((v) => v.username === e.target.username.value)) {
        dispatch(setErrorText('이미 존재하는 아이디입니다.'));
        return;
      }

      if (!e.target.username.value || !e.target.password.value) {
        dispatch(setErrorText('빈칸을 확인해주세요.'));
        return;
      }

      dispatch(
        addUserList({
          username: e.target.username.value,
          password: e.target.password.value,
        }),
      );
    } else if (e.target.name === 'login') {
      const user = userList.find((v) => v.username === e.target.username.value);
      if (!user) {
        dispatch(setErrorText('존재하지 않는 아이디입니다.'));
        return;
      }
      if (user.password !== e.target.password.value) {
        dispatch(setErrorText('비밀번호가 다릅니다.'));
        return;
      }
      dispatch(login(user.username));
    }

    dispatch(initializeFrom({ form: e.target.name }));
  }
  function onClick(e) {
    dispatch(logout());
  }

  return (
    <Auth
      form={{ loginForm, registerForm }}
      onChange={onChange}
      onSubmitLogIn={onSubmit}
      onSubmitRegister={onSubmit}
      onClick={onClick}
    />
  );
}

export default AuthContainer;
