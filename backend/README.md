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

- B4: Vào file index.js và bổ sung

```jsx
import authRoute from "./routes/auth.js";
app.use("/api/v1/auth", authRoute); // domain/api/v1/auth/register
```

# Cách để tạo một JWT_SECRET_key ngẫu nhiên trên máy

- B1: Vào Terminal (folder tổng)
- B2: Gõ: node
- B3: Gõ: crypto.randomBytes(256).toString('base64')
- B4: Copy tất cả ký tự không bao gồm ''
- B5: Paste trong file .env

# MongoDB

```jsx
{ name: { $regex: query, $options: 'i' } }: 
```

- Đây là một điều kiện tìm kiếm trong đó name là trường dữ liệu trong cơ sở dữ liệu MongoDB, $regex là một toán tử tìm kiếm sử dụng biểu thức chính quy để so khớp các chuỗi, và $options: 'i' là tùy chọn để thực hiện tìm kiếm không phân biệt chữ hoa chữ thường (không phân biệt chữ hoa thường). Điều này có nghĩa là nếu từ khóa tìm kiếm query xuất hiện trong trường name, bất kể là chữ hoa hay chữ thường, thì bản ghi đó sẽ được trả về.

```jsx
import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
```

# Token

- Vấn đề: Bất cứ ai cũng có thể sửa thông tin -> Không được phép làm vậy
-> Chỉ những người có tài khoản mới có thể sửa (dùng token)

```jsx
const authToken = req.headers.authorization

    // check token is exists
    if(!authToken || !authToken.starsWith('Bearer ')){
        return res.status(401).json({
            success: false,
            message: 'No token, authorization denied'
        })
    }

    try{
        console.log(authToken);
        next();
    } catch(error) {

    }
```

- Lấy token từ tiêu đề: Đầu tiên, mã lấy token từ tiêu đề của yêu cầu HTTP bằng cách sử dụng req.headers.authorization.

- Kiểm tra token tồn tại: Mã kiểm tra xem token có tồn tại hay không. Nếu không tồn tại hoặc không bắt đầu bằng chuỗi "Bearer ", điều này ngụ ý rằng yêu cầu không được ủy quyền. Trong trường hợp này, mã trả về một phản hồi lỗi 401 (Unauthorized) và thông báo lỗi tương ứng.

- Xác thực thành công: Nếu token hợp lệ, mã sẽ log ra console giá trị của token và gọi hàm next() để chuyển quyền điều khiển đến middleware hoặc hàm xử lý tiếp theo trong chuỗi middleware.

```jsx
import express from 'express';
import { updateUser, deleteUser, getAllUser, getSingleUser } from "../controllers/userController.js";

import { authenticate } from '../auth/verifyToken.js';

const router = express.Router()

router.get('/:id', authenticate, getSingleUser);
router.get('/', getAllUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
```

- Trong đoạn mã trên, nếu ta muốn lấy thông tin cá nhân của user mà chỉ sử dụng hàm Get cho link
http://localhost:5000/api/v1/users/6612dd05589ae05356f7d5dd
-> Nó sẽ hiện lỗi: 
```jsx
{
    "success": false,
    "message": "No token, authorization denied"
}
```
- Luồng xử lý (Thực hiện ở Postman)
- B1 : Sau khi login sẽ được trả về token (Xem ở authController để biết chi tiết)
- B2 : Copy token đang được hiện
- B3 : Vào Authorization ở Navbar trong Postman (bên dưới thanh link của cái muốn làm. Ví dụ ở bên dưới link http://localhost:5000/api/v1/users/6612dd05589ae05356f7d5dd)
- B4 : Ở thanh select options => Chọn Bearer Token => Có cột Token ở bên phải => Paste cái token vừa copy
- B5 : Bấm Send để thực hiện lại và nó sẽ không bị lỗi

```jsx
const token = authToken.split(" ")[1]
```

-Dòng mã này sử dụng phương thức split() để chia chuỗi authToken thành một mảng các phần dựa trên dấu cách (" "). Sau đó, nó lấy phần tử thứ hai của mảng, tức là phần tử có chỉ số 1, bằng cách sử dụng chỉ số mảng.

- Ở đây, giả sử chuỗi authToken có định dạng "Bearer token_value". Bằng cách sử dụng split(" "), chuỗi sẽ được chia thành một mảng hai phần tử: ["Bearer", "token_value"]. Dòng mã const token = authToken.split(" ")[1] sẽ trích xuất phần tử thứ hai của mảng, tức là "token_value", và lưu trữ nó vào biến token.

- Tóm lại, biến token sẽ chứa giá trị token được trích xuất từ chuỗi authToken.


# Hạn chế truy cập

```jsx
export const restrict = roles => async(req, res, next) => {
    const userId = req.userId
    let user;

    const patient = await User.findById(userId)
    const doctor = await Doctor.findById(userId)

    if(patient){
        user = patient 
    }
    if(doctor){
        user = doctor
    }

    if(!roles.include(user.role)){
        return res.status(401).json({
            success: false,
            message: "You're not authorized"
        })
    }

    next();
}
```

```jsx
import express from 'express';
import { updateUser, deleteUser, getAllUser, getSingleUser } from "../controllers/userController.js";

import { authenticate, restrict } from '../auth/verifyToken.js';

const router = express.Router()

router.get('/:id', authenticate, restrict(['patient']), getSingleUser);
router.get('/', authenticate, restrict(['admin']), getAllUser);
router.put('/:id', authenticate, restrict(['patient']), updateUser);
router.delete('/:id', authenticate, restrict(['patient']), deleteUser);

export default router;
```

```jsx
import express from 'express';
import { updateDoctor, deleteDoctor, getAllDoctor, getSingleDoctor } from "../controllers/doctorController.js";

import { authenticate, restrict } from '../auth/verifyToken.js';

const router = express.Router()

router.get('/:id', getSingleDoctor);
router.get('/', getAllDoctor);
router.put('/:id', authenticate, restrict(['doctor']), updateDoctor);
router.delete('/:id', authenticate, restrict(['doctor']), deleteDoctor);

export default router;
```

# Restrict
- restrict Function: Đây là một hàm middleware được xuất ra dưới dạng hàm arrow. Nó nhận một mảng roles là danh sách các vai trò mà người dùng được cấp phép truy cập.

- Middleware Function Parameters: Hàm middleware này nhận ba tham số: req, res, và next. req là đối tượng yêu cầu, res là đối tượng phản hồi, và next là một hàm được gọi để chuyển điều khiển sang middleware tiếp theo trong chuỗi middleware.

- Logic: Trong hàm middleware này, nó bắt đầu bằng việc lấy userId từ đối tượng yêu cầu req. Sau đó, nó khởi tạo một biến user để lưu trữ thông tin về người dùng.

- Kiểm tra Vai trò của Người Dùng: Tiếp theo, nó sử dụng userId để tìm người dùng trong cơ sở dữ liệu. Nó tìm kiếm cả trong mô hình User và mô hình Doctor, và gán người dùng tương ứng vào biến user.

- Xác thực Vai trò: Sau khi tìm thấy thông tin người dùng, nó kiểm tra xem vai trò của người dùng có nằm trong danh sách các vai trò đã cấp quyền hay không bằng cách sử dụng phương thức includes() trên mảng roles. Nếu không, nó trả về một phản hồi với mã trạng thái 401 và một thông báo lỗi.

- Chuyển Điều khiển Tiếp theo: Nếu người dùng có vai trò hợp lệ, hàm gọi next() để chuyển điều khiển sang middleware tiếp theo trong chuỗi middleware.

- Hàm này được thiết kế để được sử dụng như một phần của middleware trong việc xác thực và phân quyền trong ứng dụng Express.

# Add review cho bác sĩ
- B1 : Thêm reviewController và review.js

```jsx
import express from 'express';

import { getAllReviews, createReview } from '../controllers/reviewController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(getAllReviews)
    .post(authenticate, restrict(['patient']), createReview);

export default router;
```

- B2 : Sửa lại ở doctor.js

```jsx
import express from 'express';
import { updateDoctor, deleteDoctor, getAllDoctor, getSingleDoctor } from "../controllers/doctorController.js";

import { authenticate, restrict } from '../auth/verifyToken.js';

import reviewRouter from './review.js';

const router = express.Router()

// nested route
router.use('/:doctorId/reviews', reviewRouter);

router.get('/:id', getSingleDoctor);
router.get('/', getAllDoctor);
router.put('/:id', authenticate, restrict(['doctor']), updateDoctor);
router.delete('/:id', authenticate, restrict(['doctor']), deleteDoctor);

export default router;
```

# Sử dụng tuyến lồng nhau
- Ví dụ : // doctors/doctorId/reviews -> Sử dụng tuyến lồng nhau

- B1: Ở doctor.js thêm
```jsx
// nested route
router.use('/:doctorId/reviews', reviewRouter);
```
- B2: Ở review.js, thêm
```jsx
const router = express.Router({ mergeParams: true });
```

-> Trường review ở Doctor là mảng chứa Id của một loạt review

# Ở document Doctor review đang là một mảng chứa id của reviews của doctor đó
-> Ta muốn hiển thị chi tiết thông tin của các trường trong review 
-> Trong Review chứa các trường id như ._id, doctor, user => Ta muốn lấy thông tin ảnh và tên của id User đó
- B1 : Thêm reviewShema
```jsx
reviewSchema.pre(/^find/, function(next){
    this.populate({
        path: 'user',
        select: 'name photo'
    });

    next();
});


export default mongoose.model("Review", reviewSchema);
```

- B2 : Sửa ở doctorController
```jsx
    const doctor = await Doctor.findById(id)
        .populate("reviews")
        .select('-password');
```



