const express = require('express');
const jwt = require('jsonwebtoken');
const {User} = require('../db');
const {JWT_SECRET} = require('../config');
const {signupSchema, signinSchema, updateBodySchema} = require('../validations');
const {authMiddleware} = require('../middleware');

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
    const {success} = signupSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({message: 'Incorrect inputs'});
    }
    const username = req.body.username;
    const isUserExists = await User.findOne({username: username});
    if (isUserExists) {
        return res.status(411).json({message: 'Email already taken'});
    }
    const newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    const hashedPassword = await newUser.createHash(req.body.password);
    newUser.hashedPassword = hashedPassword;

    await newUser.save();

    const jwtToken = jwt.sign({userId: newUser._id}, JWT_SECRET);
    return res.status(200).json({message: 'User created successfully', token: jwtToken});
});

userRouter.post('/signin', async (req, res) => {
    const {success} = signinSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({message: 'Incorrect inputs'});
    }
    const username = req.body.username;
    const user = await User.findOne({username: username});
    if (!user) {
        return res.status(411).json({message: 'User does not exist'});
    }
    const isPasswordValid = await user.validatePassword(req.body.password, user.hashedPassword);
    if (!isPasswordValid) {
        return res.status(411).json({message: 'Password is incorrect'});
    }
    const jwtToken = jwt.sign({userId: user._id}, JWT_SECRET);
    return res.status(200).json({token: jwtToken});
});

userRouter.put('/', authMiddleware, async (req, res) => {
    const {success} = updateBodySchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({message: 'Incorrect inputs'});
    }
    const userId = req.userId;
    const user = await User.findById({_id: userId});
    if (!user) {
        return res.status(411).json({message: 'User does not exist'});
    }
    const hashedPassword = req.body.password ? await user.createHash(req.body?.password) : null;
    await User.findByIdAndUpdate({_id: userId}, {
        $set: {
            firstName: req.body?.firstName || user.firstName,
            lastName: req.body?.lastName || user.lastName,
            hashedPassword: hashedPassword || user.hashedPassword
        }
    });
    return res.status(200).json({message: 'Updated successfully'});
});

module.exports = {userRouter};