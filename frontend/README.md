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
