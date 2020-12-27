import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import auth, { userList } from './auth';
import noticeBoard, { noticeBoardList } from './noticeBoard';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['userList', 'noticeBoardList'],
};

const rootReducer = combineReducers({
  auth,
  userList,
  noticeBoard,
  noticeBoardList,
});

export default persistReducer(persistConfig, rootReducer);
