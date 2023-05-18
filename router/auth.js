const express =require('express');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const User=require('./../modules/User');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const JWT_Secert="notebookSeceret";
router.post('/',[
    body('name').isLength({min:3}).withMessage("erite at least 3 character"),
    body('email').isEmail().withMessage('invaild'),
    body('password').isLength({min:7}).withMessage("give password at least 7 character")
],async (req,res)=>{
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({result:result.array()});
    }
    let user=await User.findOne({email:req.body.email});
    try{
      if(!user){
        return res.status(400).json({err:"enter unique email"})
      }
      const salt = await bcrypt.genSaltSync(10);
      const secPass=await bcrypt.hash(req.body.password,salt)
     user=User.create({
      name:req.body.name,
      email:req.body.email,
      password:secPass
     })
     const data={
      user:{
        id:user.id
      }
     }
     const token=jwt.sign(data,JWT_Secert);
     res.json(token);
    }catch(err){
      console.error(err);
      res.status(500).json({err:"Internal server error"});
    }
})
//login authentication code
router.post('/login',[
  body('email').isEmail().withMessage('invaild'),
  body('password').isLength({min:7}).withMessage("give password at least 7 character")
],async (req,res)=>{
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({result:result.array()});
  }
  const {email,password}=req.body;
  try{
    let user=await User.findOne({email});
    if(!user){
      return res.status(400).json({err:"Enter correct value"})
    }
    const passCampare=await bcrypt.compare(password,user.password)
    if(!passCampare){
      return res.status(400).json({err:"Enter correct value"})
    }
   const data={
    user:{
      id:user.id
    }
   }
   const token=jwt.sign(data,JWT_Secert);
   res.json(token);
  }catch(err){
    console.error(err);
    res.status(500).json({err:"Internal server error"});
  }
})
module.exports=router;