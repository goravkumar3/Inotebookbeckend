const connectDb=require('./db');
const express=require('express');
connectDb();
const app=express();
const port=5000;
app.use(express.json())
 app.use('/auth/user',require('./router/auth'))
 app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })