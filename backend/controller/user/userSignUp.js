const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');

async function userSignUpController(req,res) {
    try {
        const { name, email, password } = req.body

        const user = await userModel.findOne({ email })

        console.log("user",user)

        if(user){
            throw new Error("Email đã tồn tại")
        }
        if(!name){
            throw new Error("Hãy nhập tên của bạn")
        }
        if(!email){
            throw new Error("Hãy nhập email của bạn")
        }
        if(!password){
            throw new Error("Hãy nhập mật khẩu của bạn")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);
        // Store hash in your password DB

        if(!hashPassword){
            throw new Error("Lỗi khi mã hóa mật khẩu")
        }

        const payload ={
            ...req.body,
            role : "GENERAL",
            password : hashPassword,

        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            message : "Đăng ký thành công!",
            data : saveUser,
            error : false,
            success : true
            
        })

    } catch (err) {
        res.json({
            message : err.message || err,
            error : true,
            success : false,
        })
    }
} 

module.exports = userSignUpController