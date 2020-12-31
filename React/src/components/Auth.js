import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const FormBox = styled.form`
  width: 300px;
  height: 300px;
  display: inline-block;
  float: left;
  margin: 10px;
  padding: 20px;
  border: 1px solid #dddddd;
  text-align: center;
  input {
    text-align: left;
    margin: 10px;
    width: 90%;
    font-size: 16px;
    padding: 5px;
  }
  button {
    width: 50%;
    margin: auto;
  }
  .error {
    color: red;
  }
`;

const LogOutBox = styled.div`
  width: 100%;
  height: 50px;
  font-size: 24px;
  display: flex;
  align-items: center;
  * {
    margin: 0 10px;
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
      onClick,
    } = this.props;
    return (
      <div>
        {username ? (
          <LogOutBox>
            <div>{username}</div>
            <button onClick={onClick}>로그아웃</button>
          </LogOutBox>
        ) : (
          <div>
            <div>
              <FormBox onSubmit={onSubmit} name="login">
                <h1>로그인</h1>
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
                <button type="submit">로그인</button>
                <div className="error" name="errorText">
                  {form.login.errorText}
                </div>
              </FormBox>
            </div>
            <div>
              <FormBox onSubmit={onSubmit} name="register">
                <h1>회원가입</h1>
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
                <div className="error" name="errorText">
                  {form.register.errorText}
                </div>
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
  {},
)(Auth);
