import Review from '../models/ReviewSchema.js';
import Doctor from '../models/DoctorSchema.js';

// get all reviews
export const getAllReviews = async(req, res) => {
    try{
        const reviews = await Review.find({})

        return res.status(200).json({
            success: true,
            message: 'Successful',
            data: reviews
        })
    }catch(err) {
        return res.status(404).json({
            success: false,
            message: 'Not found'
        })
    }
};

/**
 * 
 * createReview Function: Hàm này chịu trách nhiệm tạo một đánh giá mới. 
 * Nó trích xuất dữ liệu cần thiết từ cơ thể yêu cầu và đặt các giá trị mặc định n
 * ếu không được cung cấp (doctor và user). Sau đó, nó tạo một phiên bản mới của mô hình Review 
 * với dữ liệu đã trích xuất. Sau khi lưu đánh giá mới vào cơ sở dữ liệu, 
 * nó cập nhật tài liệu bác sĩ tương ứng bằng cách đẩy ID của đánh giá mới tạo vào trường mảng reviews. 
 * Nếu thành công, nó trả về một phản hồi JSON với một thông báo thành công và dữ liệu đánh giá đã lưu. 
 * Nếu xảy ra lỗi trong quá trình này, nó trả về một mã trạng thái 500 với một thông báo lỗi.
 */


// create review
export const createReview = async(req, res) => {

    if(!req.body.doctor) req.body.doctor = req.params.doctorId
    if(!req.body.user) req.body.user = req.userId

    const newReview = new Review(req.body)

    try{
        const savedReview = await newReview.save()

        await Doctor.findByIdAndUpdate(req.body.doctor, {
            $push: {reviews: savedReview._id}
        })

        return res.status(200).json({
            success: true,
            message: 'Review submitted',
            data: savedReview
        })
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}