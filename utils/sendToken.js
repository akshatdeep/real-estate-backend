exports.sendToken = (register, statusCode, res) =>{
    const token = register.getjettoken()

    
    
    const options = {
        exipres:new Date(
            Date.now() + process.env.COOKIE_EXIPRES  *24 * 60 * 60 * 1000// 1 hour
        ),
        httpOnly: true,
        
    }
    const {username, email} = register
    res.status(statusCode).cookie("token", token, options).json({success:true,
    id:register._id, token, username:username, email:email})



}