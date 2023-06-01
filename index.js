const connectDb=require('./db');
const express=require('express');
const cors=require('cors')
connectDb();
const app=express();
app.use(cors());
const port=5000;
app.use(express.json())
 app.use('/api/auth',require('./router/auth'))
 app.use('/api/notes',require('./router/note'))
 app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })