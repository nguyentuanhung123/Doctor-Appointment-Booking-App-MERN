import express from 'express';

import { getAllReviews, createReview } from '../controllers/reviewController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';

/**
 * Router Definition: Một router mới được tạo bằng cách sử dụng express.Router(). Cờ mergeParams: true được sử dụng để cho phép truy cập đến các tham số của router cha (nếu có).
 * Route Definitions: Router này được cấu hình để xử lý các yêu cầu đến địa chỉ cơ bản (route '/') của router.
 * GET: Nếu nhận được một yêu cầu GET tới địa chỉ cơ bản, nó sẽ gọi hàm getAllReviews từ reviewController.js để lấy tất cả các đánh giá và trả về chúng.
 * POST: Nếu nhận được một yêu cầu POST tới địa chỉ cơ bản, nó sẽ đầu tiên kiểm tra xác thực của người dùng bằng cách sử dụng hàm authenticate và sau đó kiểm tra quyền truy cập 
 * bằng cách sử dụng hàm restrict(['patient']). Nếu người dùng được xác thực và có quyền, nó sẽ gọi hàm createReview từ reviewController.js để tạo một đánh giá mới cho bác sĩ.
 */

const router = express.Router({ mergeParams: true });

// doctors/doctorId/reviews -> Sử dụng tuyến lồng nhau

router
    .route('/')
    .get(getAllReviews)
    .post(authenticate, restrict(['patient']), createReview);

export default router;

// Phải đăng nhập user rồi lấy token đó gắn vào Bearer Token
// GET: http://localhost:5000/api/v1/doctors/66150e36acad6a403cc462e6/reviews
// POST: http://localhost:5000/api/v1/doctors/66150e36acad6a403cc462e6/reviews
/**
 * {
 *    "reviewText": "Good doctor"
 *    "rating": 5
 * }
 */