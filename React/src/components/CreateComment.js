import React from 'react';
import { connect } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link } from 'react-router-dom';

class CreateComment extends React.Component {
  componentDidMount() {
    this.onChange = this.props.onChange;
    this.onClick = this.props.onClick;
  }

  render() {
    const { username } = this.props;
    return (
      <div>
        {username ? (
          <div>
            <input
              className="title"
              type="text"
              placeholder="제목"
              onChange={(e) =>
                this.onChange({ name: 'title', data: e.target.value })
              }
              style={{
                width: '90%',
                margin: '10px',
                padding: '5px',
                fontSize: '24px',
              }}
            />
            <CKEditor
              editor={ClassicEditor}
              config={{
                ckfinder: {
                  uploadUrl: '/upload',
                },
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                this.onChange({ name: 'text', data });
              }}
            />
            <button
              className="submit-notice"
              onClick={(e) => {
                this.onClick(e);
              }}
            >
              입력
            </button>
            <Link to="/commentlist/1">
              <button>취소</button>
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    username: state.auth.username,
    errorText: state.comment.errorText,
  }),
  {},
)(CreateComment);
