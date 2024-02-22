const express = require('express');
const {authMiddleware} = require('../middleware');
const {Account} = require('../db');
const {default: mongoose} = require('mongoose');

const accountRouter = express.Router();

accountRouter.get('/balance', authMiddleware, async (req, res) => {
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

        const senderAccountId = req.userId;
        const receiverAccountId = req.body.to;
        const amount = req.body.amount;

        const senderAccount = await Account.findOne({userId: senderAccountId}).session(session);
        const receiverAccount = await Account.findOne({userId: receiverAccountId}).session(session);
        if (!senderAccount || !receiverAccount) {
            session.abortTransaction();
            return res.status(400).json({message: 'Invalid account'});
        }
        if (senderAccount.balance < amount) {
            session.abortTransaction();
            return res.status(400).json({message: "Insufficient balance"});
        }

        const senderBalance = (senderAccount.balance - amount);
        const receiverBalance = parseFloat(receiverAccount.balance + amount);

        await Account.findOneAndUpdate({userId: senderAccountId}, {
            $set: {
                balance: senderBalance.toFixed(2)
            }
        }).session(session);

        await Account.findOneAndUpdate({userId: receiverAccountId}, {
            $set: {
                balance: receiverBalance.toFixed(2)
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