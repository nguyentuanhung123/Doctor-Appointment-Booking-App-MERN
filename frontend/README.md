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
