const express = require('express');
const app = express();
const cors = require('cors'); 
const accountRouter = require('./routes/account');
const userRouter = require('./routes/user');

app.use(cors());
// Middleware for parsing request bodies
app.use(express.json()); // Built-in JSON parser

app.use('/user', userRouter);
app.use('/account', accountRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
