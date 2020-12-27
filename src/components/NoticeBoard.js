import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ImageUploader from 'react-images-upload';

const FormBox = styled.form`
  width: 300px;
  margin-top: 20px;

  input {
    font-size: 16px;
    padding: 5px;
  }
`;

const TextBox = styled.div`
  margin-top: 20px;
  * {
    display: inline-block;
  }
`;

const ImageListBox = styled.div`
  border: 1px solid black;
  height: 100px;
  margin-right: 10px;
  img {
    height: 100%;
  }
`;

function NoticeBoard({ text, onChange, onSubmit, onClick, onChangeImg }) {
  const username = useSelector(({ auth }) => auth.username);
  const noticeBoardList = useSelector(({ noticeBoardList }) => noticeBoardList);
  const errorText = useSelector(({ noticeBoard }) => noticeBoard.errorText);

  return (
    <div>
      {username ? (
        <FormBox onSubmit={onSubmit}>
          <input
            name="notice_board"
            type="text"
            placeholder="게시글"
            onChange={onChange}
            value={text}
          />
          <ImageUploader
            withIcon={false}
            withPreview={true}
            label=""
            buttonText="이미지"
            imgExtension={['.jpg', '.gif', '.png', '.gif', '.svg']}
            onChange={onChangeImg}
            maxFileSize={1048576}
            fileSizeError="용량이 너무 큽니다."
          />
          <button type="submit">등록</button>
          <div>{errorText}</div>
        </FormBox>
      ) : (
        <></>
      )}
      {noticeBoardList.map((v) => (
        <TextBox key={v.id}>
          {v.imgs.length ? (
            <ImageListBox key={v.id}>
              {v.imgs.map((img, i) => (
                <img key={`${v.id}_${i}`} src={img} alt={v.id} />
              ))}
            </ImageListBox>
          ) : (
            <></>
          )}
          <div>
            {v.username} / {v.text}
          </div>
          {v.username === username ? (
            <button name={v.id} onClick={onClick}>
              삭제
            </button>
          ) : (
            <></>
          )}
        </TextBox>
      ))}
    </div>
  );
}

export default NoticeBoard;
