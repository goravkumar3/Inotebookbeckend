const jwt=require('jsonwebtoken');
const JWT_Secert="notebookSeceret";

const fetchUser=async (req,res,next)=>{
    try {
        const token=req.header('auth-token')
if(!token){
    return res.status(401).send({error:"Access deniad"})
}
const decode=await jwt.verify(token,JWT_Secert);
req.user=decode.user;
next();
    } catch (err) {
      console.error(err);
      res.status(500).json({err:"Internal server error"}); 
    }

}
module.exports=fetchUser;