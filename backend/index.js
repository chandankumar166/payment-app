const express = require('express');
const {PORT} = require('./config');
const {apiRouter} = require('./routes');
const {userRouter} = require('./routes/user');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1', apiRouter);
app.use('/api/v1/user', userRouter);

app.listen(PORT, () => console.log(`Server is listening at ${PORT}`));