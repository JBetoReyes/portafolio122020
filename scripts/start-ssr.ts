import express from 'express';

const app = express();

const APP_PORT = 3001;

(async () => {
  app.listen(APP_PORT, () => {
    console.log(`App running on port ${APP_PORT}`);
  });
})()
