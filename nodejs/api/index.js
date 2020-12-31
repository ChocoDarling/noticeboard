import express from 'express';
import auth from './auth';
import comment from './comment';

const api = express();

api.use('/auth', auth);
api.use('/comment', comment);

export default api;
