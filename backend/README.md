# Các link cần tải (Sau khi đã tạo package.json)

- npm i express mongodb mongoose cors jsonwebtoken cookie-parser dotenv bcryptjs

- npm i -D nodemon (có thể không chính xác) và chỉnh sửa trong script

- Thêm "type": "module" trong package.json

# Kết nối MongoDB

- Thiết lập cài đặt của Mongoose: Dòng mongoose.set('strictQuery', false) được sử dụng để thiết lập cài đặt cho Mongoose. Trong trường hợp này, cài đặt strictQuery được đặt thành false. Cài đặt này thông báo cho Mongoose rằng nó không nên áp dụng chế độ nghiêm ngặt cho các truy vấn.

- Hàm kết nối với cơ sở dữ liệu MongoDB: Hàm connectDB được định nghĩa là một hàm bất đồng bộ (async). Hàm này thực hiện việc kết nối đến cơ sở dữ liệu MongoDB sử dụng mongoose.connect().

- Kết nối đến cơ sở dữ liệu: Hàm mongoose.connect() được sử dụng để thực hiện kết nối đến cơ sở dữ liệu MongoDB. Nó nhận vào một đối số là URL của cơ sở dữ liệu, được lấy từ biến môi trường MONGO_URL thông qua process.env.MONGO_URL.

# Middleware

- Middleware cho định tuyến: app.use() là một phương thức của đối tượng Express application (app). Nó được sử dụng để thiết lập các middleware cho ứng dụng.

- express.json(): Middleware này được sử dụng để phân tích cú pháp của dữ liệu gửi đến server dưới dạng JSON. Khi client gửi một yêu cầu có dữ liệu dưới dạng JSON (ví dụ: thông qua fetch hoặc axios trong JavaScript), middleware này sẽ giúp Express biên dịch dữ liệu JSON đó thành JavaScript object để xử lý trong các route của ứng dụng. Điều này giúp bạn dễ dàng truy cập và sử dụng dữ liệu từ yêu cầu. Ví dụ, nếu bạn gửi một yêu cầu POST với dữ liệu JSON từ client, bạn có thể truy cập dữ liệu đó thông qua req.body trong các route của ứng dụng.

- cookieParser(): Middleware này được sử dụng để phân tích và đọc các cookie trong yêu cầu HTTP. Khi một yêu cầu được gửi đến server, middleware này sẽ giúp Express phân tích và chuyển đổi các cookie được gửi kèm theo yêu cầu thành một đối tượng JavaScript, giúp bạn dễ dàng truy cập và sử dụng các giá trị cookie đó trong các route của ứng dụng.

- cors(corsOptions): Middleware này được sử dụng để xử lý Cross-Origin Resource Sharing (CORS), cho phép server chấp nhận các yêu cầu từ các nguồn khác nhau. Trong trường hợp này, corsOptions được sử dụng để cấu hình CORS cho ứng dụng. Nó cho phép tất cả các nguồn (origin) truy cập vào API của bạn, bằng cách thiết lập origin: true. Điều này sẽ bỏ qua các hạn chế CORS và cho phép tất cả các nguồn truy cập vào API của bạn. Điều này có thể hữu ích trong quá trình phát triển, nhưng nên được điều chỉnh để cung cấp quyền truy cập phù hợp trong môi trường sản xuất.

- Dòng mã app.use('/api/v1/auth', authRoute) trong ứng dụng Express là cách cấu hình các tuyến đường (routes) cho một nhóm các endpoint liên quan đến xác thực (authentication).

- Đường dẫn và middleware Router: Đối số đầu tiên của app.use() là đường dẫn (path) mà các yêu cầu sẽ được ánh xạ đến. Trong trường hợp này, đường dẫn là '/api/v1/auth'.

- Router tuyến đường: Đối số thứ hai là một router, trong trường hợp này là authRoute, mà đã được định nghĩa trước đó trong mã của bạn. Router này chứa các tuyến đường (routes) cụ thể cho xác thực người dùng.

- Với cấu hình này, mọi yêu cầu đến các endpoint bắt đầu bằng '/api/v1/auth' sẽ được chuyển đến và xử lý bởi các tuyến đường được định nghĩa trong authRoute. Điều này giúp tổ chức và quản lý mã của bạn một cách hiệu quả, đặc biệt là khi ứng dụng của bạn có nhiều chức năng và endpoints khác nhau.

# Các bước khởi tạo Router trong Backend

- B1 : Tạo authController.js trong thư mục controller của backend
- B2 : Thêm code trong authController.js

```jsx
export const register = async (req, res) => {
  try {
  } catch (err) {}
};

export const login = async (req, res) => {
  try {
  } catch (err) {}
};
```

- B3 : Tạo auth.js trong thư mục routes của backend

```jsx
import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
```

B4: Vào file index.js và bổ sung

```jsx
import authRoute from "./routes/auth.js";
app.use("/api/v1/auth", authRoute); // domain/api/v1/auth/register
```

# Cách để tạo một JWT_SECRET_key ngẫu nhiên trên máy

B1: Vào Terminal (folder tổng)
B2: Gõ: node
B3: Gõ: crypto.randomBytes(256).toString('base64')
B4: Copy tất cả ký tự không bao gồm ''
B5: Paste trong file .env
