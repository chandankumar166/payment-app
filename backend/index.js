const express = require('express');
const cors = require('cors');
const {PORT} = require('./config');
const {apiRouter} = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', apiRouter);


app.listen(PORT, () => console.log(`Server is listening at ${PORT}`));