// src/main.jsx or src/index.jsx
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContext from "./context/authContext";
import UserContext from "./context/UserContext";
import ShopContext from "./context/ShopContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContext>
      <UserContext>
        <ShopContext>
<App />
        </ShopContext>
        
      </UserContext>
    </AuthContext>
  </BrowserRouter>
);
