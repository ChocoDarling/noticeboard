import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { changeField, initializeFrom } from '../modules/comment';
import CreateComment from '../components/CreateComment';

class CreateCommentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.changeField = this.props.changeField;
    this.initializeFrom = this.props.initializeFrom;
    this.initializeFrom();
  }

  onChange({ name, data }) {
    this.changeField({ name, data });
  }

  onClick(e) {
    const { title, text, username } = this.props;
    if (!title || !text) {
      alert('빈칸을 확인해주세요.');
      return;
    }
    axios
      .post('/api/comment/add', { title, comment: text, username })
      .then((comment) => {
        alert(`${comment.data.title} 제목의 게시글이 추가되었습니다.`);
        this.initializeFrom();
        this.props.history.push('/commentList/1');
      });
  }

  render() {
    return (
      <CreateComment
        text={this.text}
        onChange={this.onChange}
        onClick={this.onClick}
      />
    );
  }
}

export default connect(
  (state) => ({
    title: state.comment.title,
    username: state.auth.username,
    text: state.comment.text,
  }),
  {
    changeField,
    initializeFrom,
  },
)(CreateCommentContainer);
