import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// .ck.ck-editor__editable:not(.ck-editor__nested-editable)

class CKEditorTest extends React.Component {
  render() {
    return (
      <div>
        <input className="title" type="text" placeholder="제목" />
        <CKEditor
          editor={ClassicEditor}
          config={{
            ckfinder: {
              uploadUrl: '/upload',
            },
          }}
          data="<p>Hello from CKEditor"
          onReady={(editor) => {
            console.log('준비완료', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
        <button className="submit-notice">입력</button>
      </div>
    );
  }
}

export default CKEditorTest;
