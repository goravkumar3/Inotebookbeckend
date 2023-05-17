const express =require('express');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const User=require('./../modules/User');
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
      if(user){
        return res.status(400).json({err:"enter unique email"})
      }
     user=User.create({
      name:req.body.name,
      email:req.body.email,
      password:req.body.password
     })
     res.json(user);
    }catch(err){
      console.error(err);
      res.status(500).json({err:"server error"});
    }
})
module.exports=router;