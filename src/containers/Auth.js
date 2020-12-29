import React from 'react';
import { connect } from 'react-redux';
import {
  changeField,
  initializeFrom,
  addUserList,
  login,
  setErrorText,
} from '../modules/auth';
import Auth from '../components/Auth';

class AuthContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.changeField = this.props.changeField;
    this.initializeFrom = this.props.initializeFrom;
    this.addUserList = this.props.addUserList;
    this.login = this.props.login;
    this.logout = this.props.logout;
    this.setErrorText = this.props.setErrorText;
  }

  onSubmit(e) {
    e.preventDefault();
    const userList = this.props.userList;
    let errorText = '';
    if (e.target.name === 'register') {
      if (e.target.password.value !== e.target.passwordConfirm.value) {
        errorText = '비밀번호를 확인해주세요.';
      } else if (userList.find((v) => v.username === e.target.username.value)) {
        errorText = '이미 존재하는 아이디입니다.';
      } else if (!e.target.username.value || !e.target.password.value) {
        errorText = '빈칸을 확인해주세요.';
      }
      if (errorText) {
        this.setErrorText(e.target.name, errorText);
        return;
      }
      this.addUserList({
        username: e.target.username.value,
        password: e.target.password.value,
      });
      alert('회원가입이 성공하셨습니다.');
    } else if (e.target.name === 'login') {
      const user = userList.find((v) => v.username === e.target.username.value);
      if (!user) {
        errorText = '존재하지 않는 아이디입니다.';
        return;
      }
      if (user.password !== e.target.password.value) {
        errorText = '비밀번호가 다릅니다.';
      }
      if (errorText) {
        this.setErrorText(e.target.name, errorText);
        return;
      }
      this.login(user.username);
    }
    this.initializeFrom();
  }

  onChange(e) {
    const { value, name } = e.target;
    const form = e.target.parentNode.name;
    this.changeField({ form: form, key: name, value });
  }

  render() {
    const { login, register } = this.props.auth;
    return (
      <Auth
        form={{ login, register }}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default connect(
  (state) => ({ auth: state.auth, userList: state.userList }),
  {
    changeField,
    initializeFrom,
    addUserList,
    login,
    setErrorText,
  },
)(AuthContainer);
