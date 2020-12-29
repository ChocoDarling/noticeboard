import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';

const app = express();
app.set('port', process.env.PORT || 4000);
app.use(cors());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());

// const upload = multer({ dest: 'public/' }).single('upload');

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

app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', req.query.filename));
});

app.post('/upload', upload.single('upload'), (req, res) => {
  res.json({ uploaded: true, url: `/upload?filename=${req.file.filename}` });
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
