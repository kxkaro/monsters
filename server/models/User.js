const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    // Auth.
    username: String, // User's email. Passport expects the field to be named this way.
    password: String,

    // Active / Inactive (deleted)
    active: {
        type: Boolean,
        default: true,
    },

    // Other
    publicName: String, // Custom name displayed to other users.
    created: {
        type: Date,
        default: Date.now,
    },
    edited: {
        type: Date,
        default: undefined,
    },
    // TODO: think how to store this attribute. Values: admin, standard user etc
    auth: String,
});

// Add methods from passport-local-mongoose (authenticate, register etc)
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);