import express from 'express';
import { updateDoctor, deleteDoctor, getAllDoctor, getSingleDoctor, getDoctorProfile } from "../controllers/doctorController.js";

import { authenticate, restrict } from '../auth/verifyToken.js';

import reviewRouter from './review.js';

const router = express.Router()

// nested route
router.use('/:doctorId/reviews', reviewRouter);

router.get('/:id', getSingleDoctor);
router.get('/', getAllDoctor);
router.put('/:id', authenticate, restrict(['doctor']), updateDoctor);
router.delete('/:id', authenticate, restrict(['doctor']), deleteDoctor);

router.get('/profile/me', authenticate, restrict(['doctor']), getDoctorProfile);

export default router;

/**
 * router.use('/:doctorId/reviews', reviewRouter);: 
 * Đây là một cách để khai báo một nested route trong Express. Trong đoạn mã này, router là một đối tượng router trong Express được tạo ra trước đó.
 * /:doctorId/reviews: Đây là đường dẫn của nested route. 
 * Đường dẫn này có một phần tử biến (:doctorId) đại diện cho một tham số có thể thay đổi, trong trường hợp này, là ID của bác sĩ. Bất kỳ request nào đến địa chỉ này sẽ được định tuyến tới reviewRouter.
 * reviewRouter: Đây là một đối tượng router khác đã được định nghĩa trước đó và chứa các endpoint và logic xử lý liên quan đến việc quản lý đánh giá (reviews). 
 * Bất kỳ request nào đến nested route này sẽ được chuyển tiếp tới reviewRouter để xử lý.
 */