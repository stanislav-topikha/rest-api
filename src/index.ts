import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';
import { config } from 'dotenv';

config();

const app = express();

app.use(cors({
  credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(process.env['SERVER_PORT'], () => {
  console.log(`Server running on http://localhost:${process.env['SERVER_PORT']}/`);
});

mongoose.Promise = Promise;
mongoose.connect(process.env['MONGO_URL']);
mongoose.connection.on('error', (e) => console.warn(e));

app.use('/', router());