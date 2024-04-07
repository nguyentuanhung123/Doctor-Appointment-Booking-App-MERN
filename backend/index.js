import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose  from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/auth.js'

/**
 * Cấu hình biến môi trường: 
 * Sử dụng dotenv.config() để cấu hình biến môi trường từ tệp .env. 
 * Điều này cho phép bạn lưu trữ các cài đặt như cổng (port) 
 * hoặc thông tin xác thực trong một tệp .env và sử dụng chúng trong ứng dụng 
 * mà không cần trực tiếp truy cập vào mã nguồn.
 */
dotenv.config()

const app = express()
const port = process.env.PORT || 8000

/**
 * Trong đoạn mã trên, biến corsOptions được khởi tạo với một cấu hình CORS cơ bản. 
 * Trong trường hợp này, chúng ta chỉ định rằng tất cả các nguồn (origin) được cho phép truy cập vào API của chúng ta 
 * bằng cách thiết lập thuộc tính origin thành true.
 * Tùy thuộc vào yêu cầu của ứng dụng của bạn, bạn có thể cần phải điều chỉnh cấu hình này để cho phép các nguồn cụ thể 
 * hoặc áp dụng các hạn chế khác liên quan đến CORS. Ví dụ:
 * Để cho phép truy cập từ một nguồn cụ thể:
 * const corsOptions = { origin: 'http://example.com' }
 * Để cho phép truy cập từ nhiều nguồn:
 * const corsOptions = { origin: ['http://example1.com', 'http://example2.com'] }
 * Trong trường hợp này, cả hai nguồn http://example1.com và http://example2.com đều được cho phép truy cập vào API.
 */

const corsOptions = {
    origin: true
}

app.get('/', (req, res) => {
    res.send('Api is working!')
})

// database connection
mongoose.set('strictQuery', false)
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB database is connected');
    }catch(err) {
        console.log('MongoDB database is connection failed');
    }
}
  
// midleware
app.use(express.json()); //ta cần phân tích cú pháp json
app.use(cookieParser());
app.use(cors(corsOptions))
app.use('/api/v1/auth', authRoute) // domain/api/v1/auth/register

app.listen(port, () => {
    connectDB();
    console.log(`Example app listening on port ${port}`)
})

