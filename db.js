const mongoose = require('mongoose');

connectToMango().catch(err => console.log(err));

async function connectToMango() {
  await mongoose.connect('mongodb://localhost:27017/inotebook');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
module.exports=connectToMango;