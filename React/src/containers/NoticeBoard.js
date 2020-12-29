import React from 'react';
import { connect } from 'react-redux';
import {
  changeField,
  initializeFrom,
  input,
  remove,
  changeImgs,
  setErrorText,
} from '../modules/noticeBoard';
import NoticeBoard from '../components/NoticeBoard';

class NoticeBoardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChangeImg = this.onChangeImg.bind(this);
  }

  onChange(e) {
    const { value } = e.target;
    this.changeField({ value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { text, imgs, username } = this.props;
    if (!text) {
      this.setErrorText('게시글을 확인해주세요.');
      return;
    }
    this.input({
      text,
      imgs,
      username,
    });
    this.initializeFrom();
  }

  onClick(e) {
    this.remove({ id: e.target.name });
  }

  onChangeImg(pictureFiles, pictureDataURLs) {
    this.changeImgs(pictureDataURLs);
  }

  render() {
    return (
      <NoticeBoard
        text={this.text}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        onClick={this.onClick}
        onChangeImg={this.onChangeImg}
      />
    );
  }
}

export default connect(
  (state) => ({
    username: state.auth.username,
    text: state.noticeBoard.text,
    imgs: state.noticeBoard.imgs,
  }),
  {
    changeField,
    initializeFrom,
    input,
    remove,
    changeImgs,
    setErrorText,
  },
)(NoticeBoardContainer);
