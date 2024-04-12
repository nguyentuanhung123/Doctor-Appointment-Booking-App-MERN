import jwt from 'jsonwebtoken';
import Doctor from '../models/DoctorSchema.js';
import User from '../models/UserSchema.js';

export const authenticate = async (req, res, next) => {

    // get token from headers (Sau khi login sẽ được trả về token)
    const authToken = req.headers.authorization

    // check token is exists
    if(!authToken || !authToken.startsWith('Bearer ')){
        return res.status(401).json({
            success: false,
            message: 'No token, authorization denied'
        })
    }

    try{
        //console.log(authToken); Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTJkZDA1NTg5YWUwNTM1NmY3ZDVkZCIsInJvbGUiOiJwYXRpZW50IiwiaWF0IjoxNzEyNjU5Mjc4LCJleHAiOjE3MTM5NTUyNzh9.A1kmNSpJFXq-Dt4kgXj8YUM1MAmCamtQSHuNvUPdG9Q
        const token = authToken.split(" ")[1];

        // verify token
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

        //console.log("Decode: ", decode); //{ id: '6612dd05589ae05356f7d5dd', role: 'patient',iat: 1712659278, exp: 1713955278}
        req.userId = decode.id
        req.role = decode.role

        next(); // must be call the next function
    } catch(error) {
        
        if(error.name === 'TokenExpiredError'){
            return res.status(401).json({
                message: 'Token is expired'
            })
        }

        return res.status(401).json({
            success: false,
            message: 'Invalid Token'
        })

    }
};

/**
 * Vấn đề tiếp theo : Ở Postman, khi ta truy cấp vào route lấy tất cả users
 * nó sẽ hiện ra tất cả kết quả vì chúng ta đã được xác thực nhưng chúng ta 
 * chưa được ủy quyền, nói cách khác chúng ta muốn bảo vệ tuyến đường này và
 * chỉ có admin mới có thể mở rộng nó.
 * Ta phải triển khai biện pháp bảo mật bằng hàm bên dưới
 * 
 */

export const restrict = roles => async(req, res, next) => {
    const userId = req.userId
    //console.log("UserID: ", userId); //UserID:  6612dd05589ae05356f7d5dd
    let user;

    const patient = await User.findById(userId)
    const doctor = await Doctor.findById(userId)

    if(patient){
        user = patient 
    }
    if(doctor){
        user = doctor
    }

    if(!roles.includes(user.role)){
        return res.status(401).json({
            success: false,
            message: "You're not authorized"
        })
    }

    next();
}