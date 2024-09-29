import path from 'path';
import fs from 'fs';
import express from "express";
import jwt from 'jsonwebtoken';
import favicon from 'express-favicon';
import todoRouter from '@src/server/routers/todo-router';
import { getClientIp } from './utils/ip-util';
import { authMiddleware } from './middlewares/auth-minddleware';
import { restErrorHandler } from './middlewares/rest-middleware';
import { JWT_SECRET } from './utils/env-constant';

let indexContent: String;
const app = express();

app.set('trust proxy', 1);
app.use(favicon(path.join(__dirname, 'favicon.ico')));

// parses incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/assets", express.static(path.join(__dirname, 'assets')));

app.use("/api", authMiddleware);

app.get("/api/ping", (_, res) => {
  res.status(200).json({ message: "OK" });
});

// map router to express application
app.use('/api', todoRouter);
app.use('/api', restErrorHandler);

app.get('*', (req, res) => {
  const clientIp = getClientIp(req);

  const token = jwt.sign({ clientIp }, JWT_SECRET, { expiresIn: "1d" });

  if (!indexContent) {
    indexContent = fs.readFileSync(path.join(__dirname, 'index.html'), "utf8");
  }

  res.send(indexContent.replace("###TOKEN###", token));
});

export default app;
