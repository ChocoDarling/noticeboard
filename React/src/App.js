import React from 'react';
import { Route } from 'react-router-dom';
import './index.css';
import AuthContainer from './containers/Auth';
import CreateCommentContainer from './containers/CreateComment';
import CommentListContainer from './containers/CommentList';
import CommentViewContainer from './containers/CommentView';

class App extends React.Component {
  render() {
    return (
      <div>
        <Route path="/" component={AuthContainer} />
        <Route path="/createcomment" component={CreateCommentContainer} />
        <Route path="/commentlist/:pageNum" component={CommentListContainer} />
        <Route path="/comment/:id" component={CommentViewContainer} />
      </div>
    );
  }
}

export default App;
