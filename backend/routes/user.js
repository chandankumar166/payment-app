const express = require('express');
const jwt = require('jsonwebtoken');
const {User} = require('../db');
const {JWT_SECRET} = require('../config');
const {signupSchema, signinSchema} = require('../validations');

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

    const jwtToken = jwt.sign({username}, JWT_SECRET);
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
    const jwtToken = jwt.sign({username}, JWT_SECRET);
    return res.status(200).json({token: jwtToken});
});

module.exports = {userRouter};