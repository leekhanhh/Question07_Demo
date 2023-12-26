const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema({
    account:{
        type:mongoose.Schema.ObjectId,
        ref: "Account",
        required: true,
    },
    studentID:{
        type: String,
        require: true,
        trim: true,
        unique: true,
    },
    major:{
        type: String,
        require: true,
    },
    schoolYear: String,
    isRegistered:{
        type: Boolean,
        default: false,
    },
    isLeader:{
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Student", StudentSchema);