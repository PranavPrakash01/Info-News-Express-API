const router = require("express").Router()
const User = require("../models/Users")
const bcrypt = require('bcrypt');

//new
router.post("/register",async (req,res,next)=>{
    try{

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,

        })

        const user = await newUser.save()
        res.status(200).json(user)
    }catch(err){
     res.status(500).json(err);
    }
})
// login

router.post('/login',async (req,res)=>{
 

    try{
        const user =await User.findOne({username: req.body.username})
        if (!user){
            res.status(400).json("Invalid User")
        }
        const isValid =await bcrypt.compare(req.body.password, user.password)
        
        if (!isValid){
            res.status(400).json("Invalid Password")
        }

        res.status(200).json(user);
    }catch(err){
     res.status(500).json(err);
    }

    
})

//Admin
router.post('/admin',async (req,res)=>{
 

    try{
        const user =await User.findOne({username: req.body.username})
        if ("Admin"!= (user.username)){
            res.status(400).json("You Are Not An Admin")
        }
        const isValid =await bcrypt.compare(req.body.password, user.password)
        
        if (!isValid){
            res.status(400).json("Invalid Password")
        }

        res.status(200).json("Login Succes!");
    }catch(err){
     res.status(400).json("You Are Not An Admin");
    }
})




module.exports = router 