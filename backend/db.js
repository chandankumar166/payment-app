const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://chandan:mongodb@cluster0.lqpfrmw.mongodb.net/')
    .then(() => console.log('Mongodb was connected successfully'))

const userSchema = mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String
})

const User = mongoose.model('user', userSchema);

module.exports = {User}