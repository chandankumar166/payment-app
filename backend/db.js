const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://chandan:mongodb@cluster0.lqpfrmw.mongodb.net/Payment')
    .then(() => console.log('Mongodb was connected successfully'));

const userSchema = mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    hashedPassword: String
});

userSchema.methods.createHash = async (password) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

userSchema.methods.validatePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

const User = mongoose.model('user', userSchema);

module.exports = {User};