import path from 'path';
import express from "express";
import todoRouter from '@src/server/routers/todo-router';

const app = express();

// parses incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/assets", express.static(path.join(__dirname, 'assets')));

app.get("/api/ping", (_, res) => {
  res.status(200).json({ message: "OK" });
});

// map router to express application
app.use('/', todoRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

export default app;
