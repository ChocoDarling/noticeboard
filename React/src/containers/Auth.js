import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  changeField,
  initializeFrom,
  login,
  logout,
  setErrorText,
} from '../modules/auth';
import Auth from '../components/Auth';

class AuthContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.changeField = this.props.changeField;
    this.initializeFrom = this.props.initializeFrom;
    this.login = this.props.login;
    this.logout = this.props.logout;
    this.setErrorText = this.props.setErrorText;
  }

  async onSubmit(e) {
    e.preventDefault();
    let errorText = '';
    if (e.target.name === 'register') {
      if (e.target.password.value !== e.target.passwordConfirm.value) {
        errorText = '비밀번호를 확인해주세요.';
      } else if (!e.target.username.value || !e.target.password.value) {
        errorText = '빈칸을 확인해주세요.';
      }
      if (errorText) {
        this.setErrorText({
          form: e.target.name,
          errorText,
        });
        return;
      }
      axios
        .post('/api/auth/register', {
          username: e.target.username.value,
          password: e.target.password.value,
        })
        .then((user) => {
          if (user.data === 'exist username') {
            this.setErrorText({
              form: e.target.name,
              errorText: '이미 존재하는 아이디입니다.',
            });
            return;
          } else {
            this.login(user.data);
            alert('회원가입이 성공하셨습니다.');
            this.initializeFrom();
            this.props.history.push('/commentList/1');
          }
        });
    } else if (e.target.name === 'login') {
      if (!e.target.username.value || !e.target.password.value) {
        errorText = '빈칸을 확인해주세요.';
      }
      axios
        .post('/api/auth/login', {
          username: e.target.username.value,
          password: e.target.password.value,
        })
        .then((user) => {
          if (user.data === 'not found') {
            errorText = '존재하지 않는 아이디입니다.';
          } else if (user.data === 'not match password') {
            errorText = '비밀번호가 다릅니다.';
          } else {
            this.login(user.data);
            alert('로그인이 성공하셨습니다.');
            this.initializeFrom();
            this.props.history.push('/commentList/1');
          }
          if (errorText) {
            this.setErrorText({ form: e.target.name, errorText });
            return;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  onChange(e) {
    const { value, name } = e.target;
    const form = e.target.parentNode.name;
    this.changeField({ form: form, key: name, value });
  }

  onClick(e) {
    this.logout();
    this.props.history.push('/');
  }

  render() {
    const { login, register } = this.props.auth;
    return (
      <Auth
        form={{ login, register }}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        onClick={this.onClick}
      />
    );
  }
}

export default connect((state) => ({ auth: state.auth }), {
  changeField,
  initializeFrom,
  login,
  logout,
  setErrorText,
})(AuthContainer);
