import React from 'react';
import AuthContainer from './containers/Auth';
import NoticeBoardContainer from './containers/NoticeBoard';
import CKEditorTest from './components/CKEditorTest';
import { Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <Route path="/" component={AuthContainer} />
        <Route path="/notice" component={NoticeBoardContainer} />
        <Route path="/ckeditor" component={CKEditorTest} />
      </div>
    );
  }
}

export default App;
