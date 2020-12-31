import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import auth from './auth';
import comment from './comment';
import commentList from './commentList';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['username'],
};

const rootReducer = combineReducers({
  auth,
  comment,
  commentList,
});

export default persistReducer(persistConfig, rootReducer);
