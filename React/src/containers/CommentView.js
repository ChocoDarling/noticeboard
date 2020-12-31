import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import CommentView from '../components/CommentView';

class CommentViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comment: {} };
    this.commentRef = React.createRef();
  }

  componentDidMount() {
    axios.get(`/api/comment/${this.props.match.params.id}`).then((comment) => {
      this.setState(() => ({ comment: comment.data }));
      this.commentRef.current.innerHTML = comment.data.comment;
    });
  }

  render() {
    return (
      <CommentView comment={this.state.comment}>
        {this.state.comment.title ? (
          <>
            <h1>{this.state.comment.title}</h1>
            <div ref={this.commentRef}></div>
          </>
        ) : (
          <></>
        )}
      </CommentView>
    );
  }
}

export default connect(
  (state) => ({
    username: state.auth.username,
  }),
  {},
)(CommentViewContainer);
