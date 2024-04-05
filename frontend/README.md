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
