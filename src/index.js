import express from "express";
import { getUsers } from "./db";

const app = express();

const port = 3500;

app.get('/', (req, res) => {
  res.json({
    info: 'Node.js, Express, and Postgres API'
});
});


// SQL end points
app.get('/users', getUsers)

app.listen(port, () => {
  console.log(`App running on port ${port}`)
});