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
            return res.status(400).json({
                success: false,
                message: "Username is required"
            });
        }

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const emailRegex = /^[a-zA-Z0-9.\_%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format!"
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            });
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
                success: false,
                message: "Email already registered!"
            });
        }

        await user.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error creating user",
            error: error.message
        });
    }
}


const bankinfocontroller = (req, res) => {

    const balance = 1000;

    return res.status(200).json({
        success: true,
        message: `Your balance is: ${balance}`
    })

}


const deletUser = async (req, res) => {

    const id = req.params

    try {

        await usermodel.findByIdAndDelete(id.id)

        return res.status(200).json({
            success: true,
            message: "User delete successful"
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "User can't delete",
            error: error.message
        })
    }
}


const updateUser = async (req, res) => {

    const id = req.params

    const {
        username,
        email,
        password
    } = req.body

    try {

        const updatedUser = await usermodel.findByIdAndUpdate(
            id.id,
            {
                username,
                email,
                password
            },
            {
                new: true
            }
        )

        return res.status(200).json({
            success: true,
            message: "User update successful",
            user: updatedUser
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "User can't update",
            error: error.message
        })
    }
}


const allUser = async (req, res) => {

    try {

        const users = await usermodel.find();

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            users: users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to get users",
            error: error.message
        });

    }
}
const imageUploder = async (req, res) => {
    res.send("Uplode successfully")


}



module.exports = {
    authController,
    bankinfocontroller,
    allUser,
    deletUser,
    updateUser,
    imageUploder
};