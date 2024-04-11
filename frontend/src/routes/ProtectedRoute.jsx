import { useContext } from "react";
import { Navigate } from 'react-router-dom';
import { authContext } from "../context/AuthContext"

/**
 * Sử dụng hook useContext để lấy thông tin về token và role từ context authContext. 
 * Điều này cho phép component truy cập vào thông tin xác thực của người dùng từ bất kỳ nơi nào mà authContext đã được cung cấp.
 * Kiểm tra xem người dùng đã xác thực (token tồn tại) và có quyền truy cập (isAllowed) vào route hay không.
 * Nếu có, component trả về children, nghĩa là các thành phần con được bảo vệ bởi route.
 * Nếu không, component chuyển hướng người dùng đến trang đăng nhập (/login) bằng cách sử dụng <Navigate to='/login' replace={true}/>. 
 * Phương thức replace={true} thay thế đường dẫn hiện tại trong lịch sử điều hướng.
 * Cấu trúc này cho phép bạn bảo vệ các route trong ứng dụng của mình bằng cách kiểm tra vai trò của người dùng và xác thực của họ. 
 * Nếu người dùng không có quyền truy cập, họ sẽ được chuyển hướng đến trang đăng nhập.
 */

const ProtectedRoute = ({children, allowedRoles}) => {

    const { token, role } = useContext(authContext);

    const isAllowed = allowedRoles.includes(role);

    const accessibleRoute = token && isAllowed ? children : <Navigate to='/login' replace={true}/>

    return accessibleRoute;
}

export default ProtectedRoute;

