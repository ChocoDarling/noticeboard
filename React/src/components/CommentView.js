import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const CommentBox = styled.div`
  width: 100%;
  h1 {
    text-align: center;
  }
  div {
    width: 90%;
    margin: auto;
  }
  img {
    max-width: 100%;
  }
`;

class CommentView extends React.Component {
  render() {
    return <CommentBox>{this.props.children}</CommentBox>;
  }
}

export default connect(
  (state) => ({
    username: state.auth.username,
  }),
  {},
)(CommentView);
