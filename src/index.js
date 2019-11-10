import express from "express";
import { getUsers, createUser } from "./db";

const app = express();

const port = 3500;

app.get('/', (request, response) => {
  response.json({
    info: 'Node.js, Express, and Postgres API'
});
});


// SQL end points
app.get('/employees', getUsers);
app.post('/employees', createUser)


app.listen(port, () => {
  console.log(`App running on port ${port}`)
});