const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs")

//create schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: "string",
            required: true,
            trim: true,
            lowercase: true,
        },
        email: {
            type: "String",
            required: true,
            unique:true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("unsuitable email address");
                }

            }

        },
        age: {
            type: "number",
            default: 18,
            validate(value) {
                if (value < 18) {
                    throw new Error("Minors not allowed")
                }

            },

        },
        password: {
            type: "string",
            minLength: 4,
            trim: true,
            validate(value) {
                if (value.toLowerCase().includes("password")) {
                    throw new Error("password can't be password");
                }
            }
        }
    }
);
//create static function findCredentials
userSchema.statics.findCredentials = async (email, password) => {

    const user = await userModel.findOne({ email });
    if (!user) {
        throw new Error("Email not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Password not match");
    }
    return user;



}
//create document middleware
userSchema.pre("save", async function (next) {
    const user = this; //in pre middleware this refer document (here user)
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})


//create user model 
const userModel = mongoose.model('User', userSchema);






module.exports = userModel;