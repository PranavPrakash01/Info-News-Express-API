const router = require("express").Router()
const { response } = require("express");
const Post = require("../models/Posts")

//all posts
router.get('/allpost',async (req,res,next)=>{
    const posts =await Post.find({})
    try{
        res.status(200).send(posts)
    }catch(err){
        res.status(500).json(err)
    }
    
})
//Single Post
router.get('/:id',async (req,res,next)=>{
    const post =await Post.findById(req.params.id);
    try{
        res.status(200).send(post)
    }catch(err){
        res.status(500).json(err)
    }
    
})




//new posts
router.post('/newpost',async (req,res,next)=>{
    
    try{
        if ( req.body.username === "Admin" ){
            
        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,      
            category:req.body.category,
            photo:req.body.photo
        })
        const post = await newPost.save()
        res.status(200).json(post)
        }else{
            res.status(401).json("You are not an admin")
        }
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }

    
})

//delete

router.delete('/:id',async (req,res,next)=>{
    try{
        const post =await Post.findById(req.params.id);

      

        if ( req.body.username === "Admin" ){
             try{
               
                await post.delete()
                res.status(200).json("Post Deleted")
            }catch(err){
                res.status(500).json(err)
                
            }
        
       
           
            }else{
                res.status(401).json("You are not an admin")
                console.log("not admin");
            }
    }catch(err){
        res.status(500).json(err)
    }

})

module.exports = router 