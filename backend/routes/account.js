const express = require('express');
const {authMiddleware} = require('../middleware');
const {Account, Transaction, User} = require('../db');
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

        const senderBalance = (senderAccount.balance - amount).toFixed(2)
        const receiverBalance = (receiverAccount.balance + +amount).toFixed(2)

        await Account.findOneAndUpdate({userId: senderAccountId}, {
            $set: {
                balance: senderBalance
            }
        }).session(session);

        await Account.findOneAndUpdate({userId: receiverAccountId}, {
            $set: {
                balance: receiverBalance
            }
        }).session(session);

        session.commitTransaction();

        const date = new Date();
        let invoiceId = '';
        for (let i = 0; i <= 6; i++) {
            invoiceId += Math.round(Math.random() * 10);
        }
        const sender = await User.findById(senderAccountId);
        const receiver = await User.findById(receiverAccountId);

        const senderTransactions = await Transaction.findOne({userId: senderAccountId});
        const receiverTransactions = await Transaction.findOne({userId: receiverAccountId});
        const senderTransactionData = {
            amount: amount,
            status: 'Transfer',
            transactionDate: (date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()),
            invoiceId: 'OP' + invoiceId
        }
        const receiverTransactionData = {
            amount: amount,
            status: 'Receive',
            transactionDate: (date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()),
            invoiceId: 'OP' + invoiceId
        }
        if (!senderTransactions) {
            const senderTransaction = {
                userId: senderAccountId,
                name: sender.firstName + ' ' + sender.lastName,
                transactions: [senderTransactionData]
            };
            await Transaction.create(senderTransaction);
        }
        if (!receiverTransactions) {
            const receiverTransaction = {
                userId: receiverAccountId,
                name: receiver.firstName + ' ' + receiver.lastName,
                transactions: [receiverTransactionData]
            };
            await Transaction.create(receiverTransaction);
        }
        if (senderTransactions) {
            await Transaction.findOneAndUpdate({userId: senderAccountId},{
                $push: {
                    transactions: senderTransactionData
                }
            })
        }
        if (receiverTransactions) {
            await Transaction.findOneAndUpdate({userId: receiverAccountId}, {
                $push: {
                    transactions: receiverTransactionData
                }
            })
        }
        return res.status(200).json({message: 'Transfer Successfull'});

    }
    catch (error) {
        return res.status(500).send(error);
    }
});

accountRouter.delete('/delete', authMiddleware, async (req, res) => {
    const userId = req.userId;
    await User.deleteOne({_id: userId})
    await Account.deleteOne({userId: userId})
    await Transaction.deleteOne({userId: userId})
    return res.status(200).json({message: 'User deleted successfully'})
})

module.exports = {accountRouter};