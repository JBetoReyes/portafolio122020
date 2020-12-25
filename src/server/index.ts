import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

const app = express();

app.listen(8500, () => {
 console.log(
              `[${new Date().toISOString()}]`,
              chalk.blue(`App is running http://localhost:8500`)
            );
});

