import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeField,
  initializeFrom,
  input,
  remove,
  changeImgs,
  setErrorText,
} from '../modules/noticeBoard';
import NoticeBoard from '../components/NoticeBoard';

function NoticeBoardContainer() {
  const dispatch = useDispatch();
  const username = useSelector(({ auth }) => auth.username);
  const text = useSelector(({ noticeBoard }) => noticeBoard.text);
  const imgs = useSelector(({ noticeBoard }) => noticeBoard.imgs);

  function onChange(e) {
    const { value } = e.target;
    dispatch(changeField({ value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!text) {
      dispatch(setErrorText('게시글을 확인해주세요.'));
      return;
    }
    dispatch(
      input({
        text,
        imgs,
        username,
      }),
    );
    dispatch(initializeFrom());
  }

  function onClick(e) {
    dispatch(remove({ id: e.target.name }));
  }

  function onChangeImg(pictureFiles, pictureDataURLs) {
    dispatch(changeImgs(pictureDataURLs));
  }

  return (
    <NoticeBoard
      text={text}
      onChange={onChange}
      onSubmit={onSubmit}
      onClick={onClick}
      onChangeImg={onChangeImg}
    />
  );
}

export default NoticeBoardContainer;
