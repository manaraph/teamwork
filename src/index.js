import express from "express";
import { getUsers, createUser, updateUser, deleteUser } from "./db";

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
app.put('/employees/:id', updateUser)
app.delete('/employees/:id', deleteUser)


app.listen(port, () => {
  console.log(`App running on port ${port}`)
});