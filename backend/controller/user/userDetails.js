const userModel = require("../../models/userModel")

async function userDetailsController(req, res){
    try {
        console.log("userId", req.userId)
        const user = await userModel.findById(req.userId)
        
        res.status(200).json({
            message: "Chi tiết người dùng",
            data: user,
            error: false,
            success: true
        })

        console.log("user", user)

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = userDetailsController