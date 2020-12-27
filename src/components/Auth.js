import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const FormBox = styled.form`
  width: 300px;

  input {
    font-size: 16px;
    padding: 5px;
  }
`;

function Auth({ form, onChange, onSubmitLogIn, onSubmitRegister, onClick }) {
  const username = useSelector(({ auth }) => auth.username);
  const errorText = useSelector(({ auth }) => auth.errorText);

  return (
    <div>
      {username ? (
        <div>
          <div>{username}</div>
          <button onClick={onClick}>로그아웃</button>
        </div>
      ) : (
        <div>
          <div>
            <h1>로그인</h1>
            <FormBox onSubmit={onSubmitLogIn} name="login">
              <input
                autoComplete="username"
                name="username"
                type="text"
                placeholder="아이디"
                onChange={onChange}
                value={form.loginForm.username}
              />
              <input
                autoComplete="password"
                name="password"
                type="password"
                placeholder="비밀번호"
                onChange={onChange}
                value={form.loginForm.password}
              />
              <button type="submit">로그인</button>
            </FormBox>
          </div>
          <div>
            <h1>회원가입</h1>
            <FormBox onSubmit={onSubmitRegister} name="register">
              <input
                autoComplete="username"
                name="username"
                type="text"
                placeholder="아이디"
                onChange={onChange}
                value={form.registerForm.username}
              />
              <input
                autoComplete="password"
                name="password"
                type="password"
                placeholder="비밀번호"
                onChange={onChange}
                value={form.registerForm.password}
              />
              <input
                autoComplete="password"
                name="passwordConfirm"
                type="password"
                placeholder="비밀번호 확인"
                onChange={onChange}
                value={form.registerForm.passwordConfirm}
              />
              <button type="submit">회원가입</button>
            </FormBox>
          </div>
          <div>{errorText}</div>
        </div>
      )}
    </div>
  );
}

export default Auth;
