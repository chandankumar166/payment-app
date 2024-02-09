const express = require('express');
const {authMiddleware} = require('../middleware');
const {Account} = require('../db');
const {default: mongoose} = require('mongoose');

const accountRouter = express.Router();

accountRouter.get('/balance', authMiddleware, async (req, res) => {
    console.log("inside blanace route");
    const userId = req.userId;
    const account = await Account.findOne({userId: userId});
    if (!account) {
        return res.status(411).json({message: 'Account does not exist'});
    }
    return res.status(200).json({balance: account.balance});
});

accountRouter.post('/transfer', authMiddleware, async (req, res) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const fromAccountId = req.userId;
        const toAccountId = req.body.to;
        const amount = req.body.amount;

        const fromAccount = await Account.findOne({userId: fromAccountId});
        if (!fromAccount) {
            session.abortTransaction();
            return res.status(400).json({message: 'Invalid account'});
        }
        if (fromAccount.balance < amount) {
            session.abortTransaction();
            return res.status(400).json({message: "Insufficient balance"});
        }

        await Account.findOneAndUpdate({userId: fromAccountId}, {
            $inc: {
                balance: -amount
            }
        }).session(session);

        await Account.findOneAndUpdate({userId: toAccountId}, {
            $inc: {
                balance: amount
            }
        }).session(session);

        session.commitTransaction();
        return res.status(200).json({message: 'Transfer Successfull'});

    }
    catch (error) {
        return res.status(500).json({message: error});
    }
});

module.exports = {accountRouter};