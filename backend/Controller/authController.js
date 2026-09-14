const usermodel = require('../model/usermodel')
const {
    response
} = require("express");

const authController = async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body
    try {
        if (!username) {
            return res.send("Username is required");
        }
        if (!email) {
            return res.send("Email is required");
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email.trim())) {
            return res.send("Invalid email format!");
        }
        if (!password) {
            return res.send("Password is required");
        }
        const user = new usermodel({
            username: username,
            email: email,
            password: password
        });
        const existingUser = await usermodel.findOne({
            email
        });
        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered!"
            });
        }
        await user.save();
        res.send("User registered successfully");
    } catch (error) {
        return res.send("Error creating user: " + error.message);

    }
}

const bankinfocontroller = (req, res) => {
    const balance = 1000;
    return res.send(`Your balance is: ${balance}`)
}

const deletUser =async (req,res)=>{
    const id = req.params
    try {
        await usermodel.findByIdAndDelete(id.id)
        return res.send("User delete seccessfull")
        
    } catch (error) {
        return res.send("User can't delete")
    }
}
const updateUser =async (req,res)=>{
    const id = req.params
     const {username,email,password} = req.body
    try {
        await usermodel.findByIdAndUpdate(id.id,{username,email,password})
        return res.send("User update seccessfull")
        
    } catch (error) {
        return res.send(`User can't update ${error}`)
    }
}



const allUser = (req, res) => {}
module.exports = {
    authController,
    bankinfocontroller,
    allUser,
    deletUser,
    updateUser

};