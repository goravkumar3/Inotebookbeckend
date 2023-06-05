const express =require('express');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const fetchUser=require('../middleware/fetchuser')
const Notes=require('../modules/Note')

router.get('/fetchNotes',fetchUser,async (req,res)=>{
    try {
        const note=await Notes.find({user:req.user.id});
        res.send(note)
    } catch (err) {
      console.error(err);
      res.status(500).json({err:"Internal server error"});
    }
})
//add the notes
router.post('/addNotes',fetchUser,[
body('title','title must be 3 character word').isLength({min:3}),
body('description','description must be 3 character word').isLength({min:3})
],async (req,res)=>{
    const {title,description,tag}=req.body;
    try {
        const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({error:error.array()});
    }
let note=new Notes({
        title,description,tag,user:req.user.id
    })
    note=await note.save();
    res.send(note)
        
    } catch (err) {
      console.error(err);
      res.status(500).json({err:"Internal server error"});
    }
})

//update the notes
router.put('/updateNotes/:id',fetchUser,[
    body('title','title must be 3 character word').isLength({min:3}),
    body('description','description must be 10 character word').isLength({min:10})
    ],async (req,res)=>{
        const {title,description,tag}=req.body;
        try {
        const newNote={}
        if(title){newNote.title=title}
        if(description){newNote.description=description}
        if(tag){newNote.tag=tag}
        let note=await Notes.findById(req.params.id)
        if(!note){
            res.status(404).send("not found")
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Access deniad")
        }
    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.send(note) 
            
        } catch (err) {
          console.error(err);
          res.status(500).json({err:"Internal server error"});
        }
    })
    //delete the notes
router.delete('/deleteNotes/:id',fetchUser,async (req,res)=>{
        try {
        let note=await Notes.findById(req.params.id)
        if(!note){
            res.status(404).send("not found")
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Access deniad")
        }
    note=await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success":"your note has been deleted","note":note}) 
            
        } catch (err) {
          console.error(err);
          res.status(500).json({err:"Internal server error"});
        }
    })
module.exports=router;