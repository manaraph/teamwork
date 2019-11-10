import express from "express";
import { getUsers, createUser, updateUser, deleteUser } from "./db";

const app = express();

const port = 3500;

app.get('/', (request, response) => {
  response.json({
    info: 'Node.js, Express, and Postgres API'
});
});


// API end points
app.get('/api/v1/employees', getUsers);
app.post('/api/v1//employees', createUser)
app.put('/api/v1//employees/:id', updateUser)
app.delete('/api/v1//employees/:id', deleteUser)


app.listen(port, () => {
  console.log(`App running on port ${port}`)
});