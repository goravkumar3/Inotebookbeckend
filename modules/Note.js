const mongoose =require('mongoose');
const { Schema } = mongoose;
const notesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
  title:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true
  },
  tag:{
    type:String,
  },
  date:{
    type:Date,
    default:Date.now
  },
});
const Notes=mongoose.model('notes',notesSchema);
module.exports=Notes;