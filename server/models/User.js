const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, 'Username is required'], unique: true },
  password: { type: String, required: [true, 'Password is required'] },
});

userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;

try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    throw(error);
  }
});


userSchema.methods.comparePassword = async function(passwords) {
  return await bcrypt.compare(passwords, this.password);
};

module.exports = mongoose.model('User', userSchema);
