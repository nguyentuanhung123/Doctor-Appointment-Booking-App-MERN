import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        doctor: {
            type: mongoose.Types.ObjectId,
            ref: "Doctor",
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        reviewText: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
            default: 0,
        },
    },
    { 
        timestamps: true 
    }
);

// Trong review lúc này mới chỉ có trường id cho review, doctor and user => ta muốn hiển thị tên và ảnh của user đó
reviewSchema.pre(/^find/, function(next){
    this.populate({
        path: 'user',
        select: 'name photo'
    });

    next();
});


export default mongoose.model("Review", reviewSchema);