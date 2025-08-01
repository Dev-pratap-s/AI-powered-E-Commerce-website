import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import google from "../assets/google.png";
import { IoEyeSharp } from "react-icons/io5";
import { LiaEyeSolid } from "react-icons/lia";
import { AuthDataContext } from "../context/authContext"; // ✅ fixed this line
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userDataContext } from "../context/UserContext"; // ✅ Corrected import name

export default function Registration() {
  const [Show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { getCurrentUser } = useContext(userDataContext);

  const { serverUrl } = useContext(AuthDataContext); // ✅ fixed context name
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    console.log("API hitting at:", serverUrl + "/api/auth/registration");

    try {
      const result = await axios.post(
        serverUrl + "/api/auth/registration",
        { name, email, password },
        { withCredentials: true }
      );
      console.log(result.data);

      toast.success("Registration Successful!");
      getCurrentUser();
      navigate("/");
      console.log("User Data:", result.data);
    } catch (error) {
      console.error("❌ Registration Error:", error.response?.data || error.message);
      toast.error("Registration Failed!");
    }
  };

  const googleSigup = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const name = user.displayName;
      const email = user.email;

      const result = await axios.post(
        serverUrl + "/api/auth/googlelogin",
        { name, email },
        { withCredentials: true }
      );

      console.log(result.data);
      toast.success("Google Signup Successful!");
      navigate("/login");
    } catch (error) {
      console.error("Google Signup Error:", error);
      toast.error("Google Signup Failed!");
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-b from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">
      <ToastContainer position="bottom-right" autoClose={2000} />

      <div
        className="w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img className="w-[40px]" src={Logo} alt="logo" />
        <h1 className="text-[22px] font-sans">oneCart</h1>
      </div>

      <div className="w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]">
        <span className="text-[25px] font-semibold">Signup Page</span>
        <span className="text-[16px]">
          Welcome to OneCart, place your order
        </span>
      </div>

      <div className="max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[#96969635] border-[1px] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center">
        <form
          onSubmit={handleRegistration}
          className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[10px]"
        >
          <div
            className="w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer"
            onClick={googleSigup}
          >
            <img src={google} alt="" className="w-[20px]" /> Registration with Google
          </div>

          <div className="w-[100%] h-[20px] flex items-center justify-center gap-[10px]">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div> OR
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>

          <div className="w-[90%] relative h-[400px] flex flex-col items-center justify-center gap-[15px]">
            <input
              type="text"
              className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              placeholder="Enter your name"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <input
              type="text"
              className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type={Show ? "text" : "password"}
              className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            {!Show ? (
              <IoEyeSharp
                className="w-[20px] bottom-[47%] h-[25px] cursor-pointer absolute right-[2%]"
                onClick={() => setShow((prev) => !prev)}
              />
            ) : (
              <LiaEyeSolid
                className="w-[20px] bottom-[55%] h-[20px] cursor-pointer absolute right-[5%]"
                onClick={() => setShow((prev) => !prev)}
              />
            )}

            <button
              type="submit"
              className="w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold"
            >
              Register
            </button>

            <p className="flex gap-[10px]">
              You have already account
              <span
                onClick={() => navigate("/login")}
                className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
