import mongoose from "mongoose";

const mateSchema = new mongoose.Schema({
    // userId: {
    // 	type: mongoose.Schema.Types.ObjectId,
    // 	ref: "User",
    // 	required: true,
    // },
    userId: {
        type: String,
        required: true,
    },
    mateId: {
        type: String,
        required: true,
    },
}, {timestamps: true});