const mongoose = require("mongoose");
const AccountSchema = new mongoose.Schema({
    fullName:{
        type: String,
        require: true,
        trim: true,
    },
    email:{
        type: String,
        require: true,
        trim: true,
        match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    },
    phone:{
        type: String,
        require: true,
        trim: true,
        match: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
    },
    avatarPath: String,
    birthDate: Date,
    address: String,
    kind:{type: Number,require: true},
},
    {timestamps: true}
);

module.exports = mongoose.model("Account",AccountSchema);