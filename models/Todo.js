const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        strictPopulate: false
    },
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
})
const todoModel = mongoose.model('Todo', todoSchema)

module.exports = todoModel