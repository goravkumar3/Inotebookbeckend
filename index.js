const connectDb=require('./db');
const express=require('express');
connectDb();
const app=express();
const port=5000;
app.use(express.json())
 app.use('/api/auth',require('./router/auth'))
 app.use('/api/notes',require('./router/note'))
 app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })