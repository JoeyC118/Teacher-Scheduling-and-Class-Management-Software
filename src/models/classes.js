const mongoose = require("mongoose")

const classSchema = new mongoose.Schema({

    className: { 
        type: String,
        required: true
    },
    timeSlot: {
        type: String,
        required:true

    },
    roomNumber: { 
        type: String,
        required: true
    },
    isICT: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("classes", classSchema)