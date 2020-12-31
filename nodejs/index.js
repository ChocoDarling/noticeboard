import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import fs from 'fs';

import { sequelize } from './models';
import apiRouter from './api';

const app = express();
app.set('port', process.env.PORT || 4000);

try {
  fs.readdirSync('public');
} catch (error) {
  console.error('public 폴더가 없어 public 폴더를 생성합니다.');
  fs.mkdirSync('public');
}
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('db연결 완료');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'public/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(
        null,
        path.basename(file.originalname, ext) + '-' + Date.now() + ext,
      );
    },
  }),
});

app.use('/api', apiRouter);

app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', req.query.filename));
});

app.post('/upload', upload.single('upload'), (req, res) => {
  res.json({ uploaded: true, url: `/upload?filename=${req.file.filename}` });
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
