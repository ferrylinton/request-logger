import path from 'path';
import fs from 'fs';
import express from "express";
import jwt from 'jsonwebtoken';
import todoRouter from '@src/server/routers/todo-router';
import { getClientIp } from './utils/ip-util';
import { authMiddleware } from './middlewares/auth-minddleware';

let indexContent: String;
const app = express();

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

app.get('*', (req, res) => {
  const clientIp = getClientIp(req);
  console.log(`clientIp : ` + clientIp);

  const token = jwt.sign({ clientIp }, clientIp, { expiresIn: "1d" });

  if (!indexContent) {
    indexContent = fs.readFileSync(path.join(__dirname, 'index.html'), "utf8");
  }

  console.log(token);
  res.send(indexContent.replace("1234567890", token));
});

export default app;
