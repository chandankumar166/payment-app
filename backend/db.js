const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://chandan:mongodb@cluster0.lqpfrmw.mongodb.net/Payment')
    .then(() => console.log('Mongodb was connected successfully'));

const userSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    hashedPassword: String
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    balance: Number
})

userSchema.methods.createHash = async function (password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

userSchema.methods.validatePassword = async function (password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
};

const User = mongoose.model('user', userSchema);
const Account = mongoose.model('account', accountSchema);

module.exports = {User, Account};