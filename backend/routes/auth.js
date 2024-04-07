import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;

/**
 * 
 * Đoạn mã trên định nghĩa một tập tin router 
 * sử dụng Express Router để xác định các endpoint API 
 * cho việc đăng ký (/register) và đăng nhập (/login). 
 * Mỗi endpoint được định nghĩa để gọi các hàm xử lý tương ứng 
 * từ tệp authController.
 * 
 * Import Express và Controllers: Dòng đầu tiên import express 
 * để sử dụng trong tệp router và import các hàm xử lý từ tệp authController, 
 * bao gồm register và login.
 * 
 * Khởi tạo Router: Sử dụng express.Router() để tạo một đối tượng Router mới.
 * 
 * Định nghĩa Endpoint cho Đăng ký (/register) và Đăng nhập (/login): Sử dụng phương thức router.post() 
 * để định nghĩa endpoint cho việc đăng ký và đăng nhập. Endpoint /register được thiết lập để gọi hàm register 
 * từ authController, trong khi endpoint /login được thiết lập để gọi hàm login.
 */