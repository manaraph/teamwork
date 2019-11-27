import express from 'express';
import routes from "./routes";

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 3500;

app.use('/api/v1', routes );

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
