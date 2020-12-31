import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import CommentList from '../components/CommentList';
import { changeField, initializeFrom } from '../modules/commentList';

class CommentListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.username) this.props.history.push('/');
    this.changeField = this.props.changeField;
    const pageNum = this.props.match.params.pageNum;
    axios.get('/api/comment/list').then((commentList) => {
      if (commentList.data.length !== this.props.commentCount) {
        this.changeField({
          name: 'nowList',
          data: commentList.data
            .reverse()
            .slice(
              0 + (parseInt(pageNum) - 1) * 5,
              5 + (parseInt(pageNum) - 1) * 5,
            ),
        });
        this.changeField({
          name: 'fullPage',
          data: Math.ceil(commentList.data.length / 5),
        });
        this.changeField({
          name: 'nowPageNum',
          data: pageNum,
        });
      }
    });
  }

  componentDidUpdate() {
    if (this.props.match.params.pageNum !== this.props.nowPageNum) {
      const pageNum = this.props.match.params.pageNum;
      axios.get('/api/comment/list').then((commentList) => {
        if (commentList.data.length !== this.props.commentCount) {
          this.changeField({
            name: 'nowList',
            data: commentList.data
              .reverse()
              .slice(
                0 + (parseInt(pageNum) - 1) * 5,
                5 + (parseInt(pageNum) - 1) * 5,
              ),
          });
          this.changeField({
            name: 'fullPage',
            data: Math.ceil(commentList.data.length / 5),
          });
          this.changeField({
            name: 'nowPageNum',
            data: pageNum,
          });
        }
      });
      return true;
    }
    return false;
  }

  onClick(e) {
    e.target.classList.add('on');
    this.changeField({
      name: 'nowPageNum',
      data: e.target.innerHTML,
    });
  }

  render() {
    return <CommentList />;
  }
}

export default connect(
  (state) => ({
    username: state.auth.username,
    commentCount: state.commentList.commentCount,
    nowList: state.commentList.nowList,
    nowPageNum: state.commentList.nowPageNum,
  }),
  {
    changeField,
    initializeFrom,
  },
)(CommentListContainer);
