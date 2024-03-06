import express, { Application } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import router from './src/routes';

const app: Application = express();
const port = 3000;

dotenv.config();

app.use(router);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
