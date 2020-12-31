import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CommentListBox = styled.div`
  width: 90%;
  * {
    color: black;
    text-decoration: none;
  }
  > * {
    display: inline-block;
    width: 100%;
    border-top: 1px solid #dddddd;
    > div {
      display: inline-block;
      text-align: center;
    }
    .number {
      width: 10%;
      background-color: #eeeeee;
    }
    .title {
      width: 60%;
    }
    .username {
      width: 10%;
      background-color: #eeeeee;
    }
    .createAt {
      width: 20%;
    }
    :last-child {
      position: relative;
      text-align: center;
      display: block;
      * {
        border: none;
      }
      .pageNum {
        margin-right: 5px;
        background: none;
      }
      .createComment {
        position: absolute;
        right: 0;
        font-size: 14px;
        padding: 2px;
        background-color: #eeeeee;
        border-radius: 5px;
      }
    }
  }
`;

class CommentList extends React.Component {
  componentDidMount() {
    this.onChange = this.props.onChange;
  }
  render() {
    const buttonArr = [];
    for (let i = 0; i < this.props.fullPage; i++) {
      buttonArr.push(i + 1);
    }
    return (
      <CommentListBox>
        <div>
          <div className="number">번호</div>
          <div className="title">제목</div>
          <div className="username">작성자</div>
          <div className="createAt">등록시간</div>
        </div>
        {this.props.nowList.map((v) => (
          <Link to={`/comment/${v.id}`} key={`${v.id}-box`}>
            <div key={`${v.id}-number`} className="number">
              {v.id}
            </div>
            <div key={`${v.id}-title`} className="title">
              {v.title}
            </div>
            <div key={`${v.id}-username`} className="username">
              {v.username}
            </div>
            <div key={`${v.id}-createAt`} className="createAt">
              {(() => {
                const date = new Date(v.createdAt);
                return `${date.getFullYear()}-${
                  date.getMonth() + 1
                }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
              })()}
            </div>
          </Link>
        ))}
        <div onChange={this.onChange}>
          {buttonArr.map((v) => (
            <Link
              to={`/commentList/${v}`}
              key={`pageNum-${v}`}
              className="pageNum"
            >
              {v}
            </Link>
          ))}
          <Link className="createComment" to="/CreateComment">
            글쓰기
          </Link>
        </div>
      </CommentListBox>
    );
  }
}

export default connect(
  (state) => ({
    fullPage: state.commentList.fullPage,
    nowList: state.commentList.nowList,
    nowPageNum: state.commentList.nowPageNum,
  }),
  {},
)(CommentList);
