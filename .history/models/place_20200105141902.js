const mongoose = require ("mongoose")
const placeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true
        },
        icon: {type: String},
    },
    { timestamps: true}
);
module.exports = mongoose.model("Place", placeSchema);