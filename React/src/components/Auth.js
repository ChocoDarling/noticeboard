import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { logout } from '../modules/auth';

const FormBox = styled.form`
  width: 300px;

  input {
    font-size: 16px;
    padding: 5px;
  }
`;

class Auth extends React.Component {
  render() {
    const {
      form,
      username,
      errorText,
      onChange,
      onSubmit,
      logout,
    } = this.props;
    return (
      <div>
        {username ? (
          <div>
            <div>{username}</div>
            <button onClick={logout}>로그아웃</button>
          </div>
        ) : (
          <div>
            <div>
              <h1>로그인</h1>
              <FormBox onSubmit={onSubmit} name="login">
                <input
                  autoComplete="username"
                  name="username"
                  type="text"
                  placeholder="아이디"
                  onChange={onChange}
                  value={form.login.username}
                />
                <input
                  autoComplete="password"
                  name="password"
                  type="password"
                  placeholder="비밀번호"
                  onChange={onChange}
                  value={form.login.password}
                />
                <div name="errorText">{form.login.errorText}</div>
                <button type="submit">로그인</button>
              </FormBox>
            </div>
            <div>
              <h1>회원가입</h1>
              <FormBox onSubmit={onSubmit} name="register">
                <input
                  autoComplete="username"
                  name="username"
                  type="text"
                  placeholder="아이디"
                  onChange={onChange}
                  value={form.register.username}
                />
                <input
                  autoComplete="password"
                  name="password"
                  type="password"
                  placeholder="비밀번호"
                  onChange={onChange}
                  value={form.register.password}
                />
                <input
                  autoComplete="password"
                  name="passwordConfirm"
                  type="password"
                  placeholder="비밀번호 확인"
                  onChange={onChange}
                  value={form.register.passwordConfirm}
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
}

export default connect(
  (state) => ({
    username: state.auth.username,
    errorText: state.auth.errorText,
  }),
  { logout },
)(Auth);
