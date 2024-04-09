import mongoose from "mongoose";
import Doctor from "./DoctorSchema.js";

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

reviewSchema.statics.calcAverageRatings = async function(doctorId){

    // this points the current review
    const stats = await this.aggregate([{
        $match:{doctor: doctorId}
    },
    {
        $group:{
            _id: '$doctor',
            numOfRating: {$sum:1},
            avgRating: {$avg: '$rating'}
        }
    }
   ]);

   /**
    * stats là một mảng chứa các object gồm các trường
    * _id : id của doctor
    * numOfRating: số lượng review của doctor đó
    * avgRating: trung bình số sao đánh giá của doctor đó (ví dụ: numOfRating: 6, rating: 16 => avgRating: 2.66666)
    */
   //console.log(stats);
    await Doctor.findByIdAndUpdate(doctorId, {
        totalRating: stats[0].numOfRating,
        averageRating: stats[0].avgRating
    });
}

reviewSchema.post('save', function() {
    this.constructor.calcAverageRatings(this.doctor)
})


export default mongoose.model("Review", reviewSchema);