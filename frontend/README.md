# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Setup

- npm i react-router-dom react-icons react-spinners react-toastify swiper

- Add google font trong App.css

```jsx
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body{
  font-family: "Manrope", sans-serif;
}

```

# Setup Layout and Router trong App

```jsx
import React from "react";
import Header from "../components/Header/Header";
import Routers from "../routes/Routers";
import Footer from "../components/Footer/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Routers />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
```

- main.jsx

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
```

# Tailwind CSS reusable classes

- Để làm Header thì ta bao bọc nó trong thẻ <header className:'header'></header>
- Ta chưa cần làm để ý padding hay padding của nó
- Chiều cao ban đầu của thẻ <header></header> phụ thuộc vào cái có chiều cao lớn nhất (trong trường hợp này là button có h-[44px])
- Sau khi hoàn thành xong thì ta mới bắt đầu sửa thẻ header trong index.css

#

- 2xl:h-[800px]

```jsx
@media (min-width: 1536px) {
    .\32xl\:h-\[800px\] {
        height: 800px;
    }
}
```

- xl:h-[800px]

```jsx
@media (min-width: 1280px) {
    .xl\:h-\[800px\] {
        height: 800px;
    }
}
```

# Giải thích về CSS line-height

- Giả sử thẻ h1 có line-height: 70px thì mỗi dòng của nó sẽ có 70px và nội dung của mỗi dòng sẽ ở khoảng dọc giữa
- Nếu thẻ h1 xuống dòng 1 lần thì thẻ h1 sẽ có height: 140px
- Nếu ta có height: 70px và nội dung trong thẻ ngắn chỉ trong 1 dòng thì khi thêm line-height: 70px thì nôi dung sẽ được để ở dọc giữa
- Chú ý: Khi thẻ ul có line-height: 30px thì những thẻ li trong nó sẽ có height: 30px

# Giải thích về thẻ span

- Thẻ span khi được định nghĩ width và height mà không có nội dung bên trong thì phải thêm display: block để có thể hiển thị lên màn hình

# Chú thích :

- Ở thẻ header đang sử dụng background-image làm màu thẻ, khi ta cuộn trang xuống thì class sticky\_\_header sẽ được sử dụng nhưng những nội dung bên dưới layer của thẻ header sẽ bị nhìn xuyên thấu => Cách giải quyết thêm background: #fff để thẻ header không bị nhìn xuyên thấu và cũng không mất đi màu ảnh vốn có

# Ẩn hiện văn bản bằng cách nhấn nút

```jsx
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const FaqItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-3 lg:p-5 rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
      <div
        className="flex items-center justify-between gap-5"
        onClick={toggleAccordion}
      >
        <h4 className="text-[16px] leading-7 lg:text-[22px] leading-8 text-headingColor">
          {faq.question}
        </h4>
        <div
          className={`${
            isOpen && "bg-primaryColor text-white border-none"
          } w-7 h-7 lg:w-8 lg:h-8 border border-solid border-[#141F21] rounded flex items-center justify-center`}
        >
          {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </div>
      </div>

      {isOpen && (
        <div className="mt-4">
          <p className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
            {faq.content}
          </p>
        </div>
      )}
    </div>
  );
};

export default FaqItem;
```

# Sử dụng swiper

```jsx
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import patientAvatar from "../../assets/images/patient-avatar.png";

import { HiStar } from "react-icons/hi";

const Testimonial = () => {
  return (
    <div className="mt-[30px] lg:mt-[55px]">
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        <SwiperSlide>
          <div className="py-[30px] px-5 rounded-3">
            <div className="flex items-center gap-[13px]">
              <img src={patientAvatar} alt="" />
              <div>
                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                  Muhibur Rahman
                </h4>
                <div className="flex items-center gap-[2px]">
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                </div>
              </div>
            </div>

            <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
              I have taken medical services from them. They treat so well and
              they are providing the best medical services.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="py-[30px] px-5 rounded-3">
            <div className="flex items-center gap-[13px]">
              <img src={patientAvatar} alt="" />
              <div>
                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                  Muhibur Rahman
                </h4>
                <div className="flex items-center gap-[2px]">
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                </div>
              </div>
            </div>

            <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
              I have taken medical services from them. They treat so well and
              they are providing the best medical services.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Testimonial;
```

# CSS Swiper

```css
.swiper-pagination-bullet {
  width: 12px !important;
  height: 12px !important;
  border: 1px solid #181a1e !important;
  opacity: 100% !important;
  background: #fff !important;
}

.swiper-pagination-bullet-active {
  background: #0067ff !important;
  border: none !important;
}

.swiper {
  padding-bottom: 70px !important;
}

/**
* Nếu có 3 thằng thì cái giữa sẽ có css này
* Nếu có 2 thằng thì cái thứ 2 sẽ có css này
*/
.swiper-slide.swiper-slide-next {
  background: #0067ff;
  border-radius: 12px;
  box-shadow: 0px 20px 70px rgba(0, 103, 255, 0.3) !important;
}

.swiper-slide.swiper-slide-next h4,
.swiper-slide.swiper-slide-next p {
  color: #fff !important;
}

.swiper-pagination {
  top: 90% !important;
}
```

# Giải thích về col-span

- Nếu ta dùng grid để tạo 3 cột thì thẻ div có col-span-2 sẽ chiếm 2 cột

# CSS để có dấu gạch dưới mỗi lần bấm

```jsx
import { useState } from "react";
import doctorImg from "../../assets/images/doctor-img02.png";
import starIcon from "../../assets/images/Star.png";

const DoctorDetails = () => {
  const [tab, setTab] = useState("about");

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-[50px]">
          <div className="md:col-span-2">
            <div className="flex items-center gap-5">
              <figure className="max-w-[200px] max-h-[200px]">
                <img src={doctorImg} alt="" />
              </figure>

              <div>
                <span
                  className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 px-6
                                text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded"
                >
                  Surgeon
                </span>
                <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                  Muhibur Rahman
                </h3>
                <div className="flex items-center gap-[6px]">
                  <span
                    className="flex items-center gap-[6px] text-[14px] leading-5
                                    lg:text-[16px] lg:leading-7 font-semibold text-headingColor"
                  >
                    <img src={starIcon} alt="" /> 4.8
                  </span>
                  <span
                    className="text-[14px] leading-5
                                    lg:text-[16px] lg:leading-7 font-[400] text-textColor"
                  >
                    (272)
                  </span>
                </div>

                <p className="text__para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]">
                  A Swiss-French physician, bacteriologist and explorer. He is
                  famous for being the first to discover the bacillus that
                  causes the bubonic plague,
                </p>
              </div>
            </div>

            <div className="mt-[50px] border-b border-solid border-[#0066FF34]">
              <button
                onClick={() => setTab("about")}
                className={`${
                  tab === "about" && "border-b border-solid border-primaryColor"
                } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                About
              </button>
              <button
                onClick={() => setTab("feedback")}
                className={`${
                  tab === "feedback" &&
                  "border-b border-solid border-primaryColor"
                } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                Feedback
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default DoctorDetails;
```

# Format Date

```jsx
export const formatDate = (date, config) => {
  const defaultOptions = { day: "numeric", month: "long", year: "numeric" };
  const options = config ? config : defaultOptions;

  return new Date(date).toLocaleDateString("en-US", options);
};

<span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
  {formatDate("12-04-2010")}
</span>;

// -> December 4, 2010
```

# Điều chỉnh số Sao

```jsx
import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <form action="">
      <div>
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4">
          How would you rate the overrall experience
        </h3>

        <div>
          {[...Array(5).keys()].map((_, index) => {
            index += 1;

            return (
              <button
                key={index}
                type="button"
                className={`${
                  index <= ((rating && hover) || hover)
                    ? "text-yellowColor"
                    : "text-gray-400"
                } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
                onDoubleClick={() => {
                  setHover(0);
                  setRating(0);
                }}
              >
                <span>
                  <AiFillStar />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </form>
  );
};

export default FeedbackForm;
```

# Giải thích đoạn code trong Feedback và FeedbackForm

- Array(5).keys(): Đoạn mã này tạo ra một mảng có 5 phần tử (với các giá trị từ 0 đến 4) và sau đó trích xuất các key của mỗi phần tử.

- .map((\_, index) => {...}): Đây là một phương thức map được gọi trên mảng 5 phần tử, trong đó mỗi phần tử sẽ là một button "star". Callback function nhận vào hai tham số, nhưng ở đây chỉ sử dụng tham số thứ hai, tức là index của mỗi phần tử.

- index += 1;: Dòng này tăng của mỗi button lên một đơn vị. Điều này được thực hiện để đảm bảo index bắt đầu từ 1 thay vì 0.

- return (...): Mỗi lần lặp qua, một nút "star" được tạo ra với các thuộc tính và sự kiện như onClick, onMouseEnter, onMouseLeave và onDoubleClick.

- onClick={() => setRating(index)}: Khi nút được nhấp, hàm setRating sẽ được gọi với index của nút.

- onMouseEnter={() => setHover(index)}: Khi di chuột vào nút, hàm setHover sẽ được gọi với index của nút.

- onMouseLeave={() => setHover(rating)}: Khi di chuột rời khỏi nút, hàm setHover sẽ được gọi với giá trị của rating.

- onDoubleClick={() => {...}}: Khi double click vào nút, rating và hover sẽ được đặt về 0.

# Select

```jsx
<label className="text-headingColor font-bold text-[16px] leading-7">
  Gender:
  <select
    name="gender"
    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
  >
    <option value="">Select</option>
    <option value="male">Male</option>
    <option value="female">Male</option>
    <option value="other">Other</option>
  </select>
</label>
```

# Truncate Tailwind

```css
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

- Sử dụng truncate để ngăn văn bản bị ngắt dòng và cắt ngắn văn bản tràn bằng dấu chấm lửng (…) nếu cần.

# Button Updoad Photo

```jsx
const handleFileInputChange = async (e) => {
  const file = e.target.files[0];

  //later we will use cloudinary to upload images
  //console.log(file);
};

<div className="relative w-[130px] h-[50px]">
  <input
    type="file"
    name="photo"
    id="customFile"
    onChange={handleFileInputChange}
    accept=".jpg, .png"
    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
  />

  <label
    htmlFor="customFile"
    className="absolute top-0 left-0 w-full h-full
                                    flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden
                                  bg-[#0066FF46] text-headingColor font-semibold rounded-lg cursor-pointer"
  >
    Upload Photo
  </label>
</div>;
```

# Ở Contact

- max-w-screen-md

```css
.max-w-screen-md {
  max-width: 768px;
}
```

_-_ space-y-8

```css
margin-top: 2rem; /* 32px */
```

- Thêm không gian ngang giữa children
  Sử dụng space-x-\* để kiểm soát khoảng cách ngang giữa các phần tử.

-Thêm không gian theo chiều dọc giữa children
Sử dụng tiện ích space-y-\* để kiểm soát khoảng cách dọc giữa các phần tử

- sm:w-fit

# Sử dụng cloudinary để lưu trữ ảnh 
- Sử dụng tk github có cloud name: nguyentuanhung123
- Tạo 1 file .env.local 
- Tạo 1 cloud 
- B1: Vào trang web chính chủ
- B2: Ở Navbar bên trái -> Chọn biểu tượng Settings -> Upload -> Upload Presets -> Add upload preset
- B3: Sửa Upload Preset Name
- B4: Ở Signing mode -> Chọn Unsigned -> Save
- Ở folder utils, tạo file uploadCloudinary.jsx và chỉnh sửa
```jsx
const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
const cloud_name = import.meta.env.VITE_CLOUD_NAME

const uploadImageToCloudinary = async (file) => {
    const uploadData = new FormData()

    uploadData.append('file', file)
    uploadData.append('upload_preset', upload_preset)
    uploadData.append('cloud_name', cloud_name)

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: 'POST',
        body: uploadData
    })

    const data = await res.json()

    return data;
}

export default uploadImageToCloudinary;
```

- Quay lại Signup.jsx, import uploadCloudinary.jsx

```jsx
    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];

        const data = await uploadImageToCloudinary(file)
        
        //console.log(data);
        setPreviewURL(data.url)
        setSelectedFile(data.url)
        setFormData({
            ...formData,
            photo: data.url
        })
    }
```

# Tạo nút Button sau khi bấm sẽ có spinner
```jsx
import HashLoader from 'react-spinners/HashLoader';

const [loading, setLoading] = useState(false);


<button 
  disabled={loading && true}
  type="submit" 
  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
>
  { loading ? (
      <HashLoader size={35} color='#ffffff'/>
  ) : (
      'Sign Up'
  )}
</button>
```

# Sử dung Toastify 
- Vào file main.jsx, sửa
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ToastContainer
        theme='dark'
        position='top-right'
        autoClose={3000}
        closeOnClick
        pauseOnHover={false}
      />
      <App />
    </Router>
  </React.StrictMode>,
)

```


# Sau khi đăng ký xong thì sử dụng Context
- Tạo file AuthContext.jsx trong folder context
```jsx
import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
    user: null,
    role: null,
    token: null
}

export const authContext = createContext(initialState);

const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN_START':
            return {
                user: null,
                role: null,
                token: null
            };
        case 'LOGIN_SUCCESS':
            return {
                user: action.payload.user,
                role: action.payload.token,
                token: action.payload.role
            };
        case 'LOGOUT':
            return {
                user: null,
                role: null,
                token: null
            };
        default:
            return state
    }
};

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return <authContext.Provider value={{user: state.user, token: state.token, role: state.role, dispatch}}>
        {children}
    </authContext.Provider>
}
```

- B2: Vào file Login.jsx
```jsx
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const result = await res.json()

            if(!res.ok) {
                throw new Error(result.message)
            }

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    user: result.data,
                    token: result.token,
                    role: result.role
                }
            });

            console.log(result, "login data");

            setLoading(false);
            toast.success(result.message);
            navigate('/home')

        } catch(err){
            toast.error(err.message);
            setLoading(false)
        }
    }
```

- B3: Vào main.jsx, sửa lại
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <ToastContainer
          theme='dark'
          position='top-right'
          autoClose={3200}
          closeOnClick
          pauseOnHover={false}
        />
        <App />
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
)
```

# Sau khi Login xong sửa lại image ở Header
- B1: Sau khi Login sẽ có dữ liệu ở authContext
- B2: Vào Header.jsx và sửa
```jsx
import { authContext } from '../../context/AuthContext.jsx';

const { user, role, token } = useContext(authContext);

``` 
- B3: Ađ thêm thẻ h1 để hiện thị tên user

```jsx
<h1>{user?.name}</h1>
                      
<Link to='/login'>
  <button className='bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]'>
    Login
  </button>
</Link>
```

# Vấn đề xảy ra, khi refresh thì sẽ bị mất tên và phải đăng nhập lại => Không tốt
- B1: Xóa thẻ h1 ở trên
- B2: Ban đầu ta có
```jsx
<div className='flex items-center gap-4'>
  <div className='hidden'>
      <Link to='/'>
          <figure className='w-[35px] h-[35px] rounded-full cursor-pointer'>
              <img src={userImg} className='w-full rounded-full' alt=''/>
          </figure>
      </Link>
  </div>
                      
  <Link to='/login'>
      <button className='bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]'>
          Login
      </button>
  </Link>

  <span className='md:hidden' onClick={toggleMenu}>
      <BiMenu className='w-6 h-6 cursor-pointer'/>
  </span>
</div>
```

- B3: Sửa lại thành
```jsx
<div className='flex items-center gap-4'>
  {
      token && user ? (
          <div>
              <Link to={`${role === 'doctor' ? '/doctors/profile/me': '/users/profile/me'}`}>
                  <figure className='w-[35px] h-[35px] rounded-full cursor-pointer'>
                      <img src={user?.photo} className='w-full rounded-full' alt=''/>
                  </figure>

                  <h2>{user?.name}</h2>
              </Link>
          </div>
      ) : (
          <Link to='/login'>
            <button className='bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]'>
                Login
            </button>
          </Link>
      )
  }

  <span className='md:hidden' onClick={toggleMenu}>
      <BiMenu className='w-6 h-6 cursor-pointer'/>
  </span>
</div>
```

- B4: Sửa lại ở AuthContext.jsx
- Ban đầu ta có:
```jsx
import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
    user: null,
    role: null,
    token: null
}

export const authContext = createContext(initialState);

const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN_START':
            return {
                user: null,
                role: null,
                token: null
            };
        case 'LOGIN_SUCCESS':
            return {
                user: action.payload.user,
                role: action.payload.token,
                token: action.payload.role
            };
        case 'LOGOUT':
            return {
                user: null,
                role: null,
                token: null
            };
        default:
            return state
    }
};

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return <authContext.Provider value={{user: state.user, token: state.token, role: state.role, dispatch}}>
        {children}
    </authContext.Provider>
}
```

- Sửa lại thành
```jsx
import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
    user: localStorage.getItem('user') !== undefined ? JSON.parse(localStorage.getItem('user')) : null,
    role: localStorage.getItem('role') || null,
    token: localStorage.getItem('token') || null,
}

export const authContext = createContext(initialState);

const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN_START':
            return {
                user: null,
                role: null,
                token: null
            };
        case 'LOGIN_SUCCESS':
            return {
                user: action.payload.user,
                role: action.payload.token,
                token: action.payload.role
            };
        case 'LOGOUT':
            return {
                user: null,
                role: null,
                token: null
            };
        default:
            return state
    }
};

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user));
        localStorage.setItem('token', JSON.stringify(state.token));
        localStorage.setItem('role', JSON.stringify(state.role));
    }, [state]);

    return <authContext.Provider value={{user: state.user, token: state.token, role: state.role, dispatch}}>
        {children}
    </authContext.Provider>
}

```

# Chuyển đến trang cá nhân sau khi đăng nhập thành công
- B1: Xóa thẻ h2 vừa tạo ở Header
- B2: Vào thẻ Login.jsx và sửa
- Ban đầu
```jsx
<div className="mt-7">
  <button 
    type="submit" 
    className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
  >
      Login
  </button>
</div>
```
- Sửa thành
```jsx
<div className="mt-7">
  <button 
    type="submit" 
    className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
  >
      { loading ? <HashLoader /> : 'Login'}
  </button>
</div>
```

- B3: Vaò userController.js ở backend bổ sung
```jsx
export const getUserProfile = async(req, res) => {
    const userId = req.userId;

    try{
        const user = await User.findById(userId)

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const { password, ...rest } = user._doc

        return res.status(200).json({
            success: true,
            message: 'Profile info is getting',
            data: {...rest}
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong, cannot get'
        });
    }
}

export const getMyAppointments = async(req, res) => {
    try{
        // step -1: retrieve appoinments from booking for specific user
        const bookings = await Booking.find({user: req.userId})

        // step -2: extract doctor ids from appoinment bookings
        const doctorIds = bookings.map((el) => el.doctor.id)

        // step -3: retrieve doctors using doctor ids
        const doctors = await Doctor.find({_id: {$in: doctorIds}}).select('-password')

        return res.status(200).json({
            success: true,
            message: 'Appointments are getting',
            data: doctors
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong, cannot get'
        });
    }
}
```

- B4: Vào user.js của backend
- Ban đầu
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

- Sửa lại thành:
```jsx
import express from 'express';
import { updateUser, deleteUser, getAllUser, getSingleUser, getUserProfile, getMyAppointments } from "../controllers/userController.js";

import { authenticate, restrict } from '../auth/verifyToken.js';

const router = express.Router()

router.get('/:id', authenticate, restrict(['patient']), getSingleUser);
router.get('/', authenticate, restrict(['admin']), getAllUser);
router.put('/:id', authenticate, restrict(['patient']), updateUser);
router.delete('/:id', authenticate, restrict(['patient']), deleteUser);
router.get('/profile/me', authenticate, restrict(['patient']), getUserProfile);
router.delete('/appointments/my-appointments', authenticate, restrict(['patient']), getMyAppointments);

export default router;
```

- B5: Sửa lại doctorController.js
- Ban đầu:
```jsx
import Doctor from "../models/DoctorSchema.js";

export const updateDoctor = async(req, res) => {
    const id = req.params.id;

    try{
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            id, 
            { $set:req.body }, 
            { new: true }
        )

        return res.status(200).json({
            success: true,
            message: 'Successfully updated',
            data: updatedDoctor
        })
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to update'
        })
    }
}

export const deleteDoctor = async(req, res) => {
    const id = req.params.id;

    try{
        await Doctor.findByIdAndDelete(id)

        return res.status(200).json({
            success: true,
            message: 'Successfully deleted',
        })
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to update'
        })
    }
}

export const getSingleDoctor = async(req, res) => {
    const id = req.params.id;

    try{
        const doctor = await Doctor.findById(id)
            .populate("reviews")
            .select('-password');

        return res.status(200).json({
            success: true,
            message: 'Doctor found',
            data: doctor,
        })
    } catch(err) {
        return res.status(404).json({
            success: false,
            message: 'No doctor found'
        })
    }
}

export const getAllDoctor = async(req, res) => {

    try{

        /**
         * Search doctor on Web
         */
        const { query } = req.query;
        let doctors;

        if(query){
            doctors = await Doctor.find({
                isApproved: 'approved', 
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { specialization: { $regex: query, $options: 'i' } },
                ],
            }).select('-password');
        } else {
            doctors = await Doctor.find({ isApproved: 'approved' }).select('-password');
        }

        return res.status(200).json({
            success: true,
            message: 'Doctors found',
            data: doctors,
        })
    } catch(err) {
        return res.status(404).json({
            success: false,
            message: 'Not found'
        })
    }
}
```

- Sửa lại thành
```jsx
export const getDoctorProfile = async(req, res) => {
    const doctorId = req.userId;

    try{
        const doctor = await Doctor.findById(doctorId)

        if(!doctor){
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            })
        }

        const { password, ...rest } = doctor._doc;

        const appointments = await Booking.find({doctor: doctorId})

        return res.status(200).json({
            success: true,
            message: 'Profile info is getting',
            data: {...rest, appointments}
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong, cannot get'
        });
    }
```

- B6: Sửa lại ở doctor.js
```jsx
router.get('/profile/me', authenticate, restrict(['doctor']), getDoctorProfile);
```

# Sử dụng Protected Route
B1: Tạo file ProtectedRoute.jsx
```jsx
import { useContext } from "react";
import { Navigate } from 'react-router-dom';
import { authContext } from "../context/AuthContext"

const ProtectedRoute = ({children, allowedRoles}) => {

    const { token, role } = useContext(authContext);

    const isAllowed = allowedRoles.includes(role);

    const accessibleRoute = token && isAllowed ? children : <Navigate to='/login' replace={true}/>

    return accessibleRoute;
}

export default ProtectedRoute;
```

B2: Vào Route.js, sửa:
```jsx
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/home' element={<Home />}/>
            <Route path='/doctors' element={<Doctors />}/>
            <Route path='/doctors/:id' element={<DoctorDetails />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/contact' element={<Contact />}/>
            <Route path='/register' element={<Signup />}/>
            <Route path='/services' element={<Services />}/>
            <Route 
                path='/users/profile/me' 
                element={
                    <ProtectedRoute allowedRoles={['patient']}>
                        <MyAccount />
                    </ProtectedRoute>
                }
            />
            <Route 
                path='/doctors/profile/me' 
                element={
                    <ProtectedRoute allowedRoles={['doctor']}>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default Routers;
```

