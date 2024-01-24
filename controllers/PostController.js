import Post from "../models/Post.js"

export const getAll = async (req,res) => {
    try{
        const posts = await Post.find().populate('user').exec()

        res.json(posts)
    } catch(e) {
        console.log(e)
        res.status(500).json({
            message:" Error "
        })
    }
}

export const getOne = async (req,res) => {
    try{
        const postId = req.params.id;
        Post.findOneAndUpdate({
            _id:postId,
        },{
            $inc: {viewsCount: 1},
        },{
            returnDocument: 'after'
        }).then((doc,err) => {
            if(err)
                res.status(500).json({
                    message:"error"
                })
            if(!doc)
                return res.status(404).json({
                    message:"document has no found"
                })

            res.json(doc)
        })

    }
    catch(e) {
        res.status(500).json({
            message:"you got error"
        })
    }
}

export const create = async (req,res) => {
    try {
        const doc = new Post({
            title:req.body.title,
            text:req.body.text,
            image:req.body.image,
            tag:req.body.tag,
            user:req.userId,
        });

        const post = await doc.save()
        res.json(post)
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            message:"Not created"
        })
    }

}


export const remove = async (req,res) => {
    try{
        const postId = req.params.id;
        Post.findByIdAndDelete({
            _id:postId,
        }).then((doc,err) => {

            if(err) {    
                console.log(err)     
                return res.status(500).json({
                    message:"error govna"
                })
            }           

            if(!doc) {
                console.log(doc)  
                return res.status(500).json({
                    message:"error document"
                })
            }
            res.json({
                success:true
            })
        })
    }
    catch(e) {
        res.status(500).json({
            message:"Delete got an error"
        })
    }
}

export const update = async (req,res) => {
    try {
       const postId = req.params.id; 

       await Post.updateOne({
        _id: postId,
       }, {
        title:req.body.title,
        text:req.body.text,
        image:req.body.image,
        user:req.userId,
        tags:req.body.tags
       })

       res.json({
        success:true
       })
    }
    catch(e) {
        console.log(e)
        res.status(500).json({
            message:"Not updated"
        })
    }
}