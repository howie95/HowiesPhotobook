module.exports = {
    checkAdmin:function(req,res,next){
        if(req.cookies.admin){
            next()
        }else{
            res.json({
                status:"3"
            })
        }
    }
}