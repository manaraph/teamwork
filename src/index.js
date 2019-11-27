import express from 'express';
import routes from "./routes";
import dotenv from 'dotenv';

dotenv.config();

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 4000;

app.use('/api/v1', routes );

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
