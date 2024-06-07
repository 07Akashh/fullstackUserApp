const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phone: { type: String, unique: true, required: true },
    email: String,
    name: String,
    password: String,
    profile: {
        photo: String,
        pastExperience: String,
        skillSets: [String],
        educationalQualification: String,
    },
    isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
