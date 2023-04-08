const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
userSchema.virtual("todo" ,{
    ref: "Todo",
    localField: "_id",
    foreignField: "owner"
})
const userModel = mongoose.model('User', userSchema)

module.exports = userModel