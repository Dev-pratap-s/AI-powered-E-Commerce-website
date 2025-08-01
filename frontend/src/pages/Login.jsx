import React, { useState, useContext } from 'react';
import Logo from "../assets/logo.png";
import google from '../assets/google.png';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { AuthDataContext } from '../context/authContext';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { serverUrl } = useContext(AuthDataContext);
  const { getCurrentUser } = useContext(userDataContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      console.log("login ka data hai ye",res.data);
      toast.success("Login Successful!");
      getCurrentUser();
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Login Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center'>
      {/* Header */}
      <div className='w-full h-[80px] flex items-center px-8 gap-3 cursor-pointer' onClick={() => navigate("/")}>
        <img className='w-[40px]' src={Logo} alt="Logo" />
        <h1 className='text-[22px] font-sans'>OneCart</h1>
      </div>

      {/* Title */}
      <div className='h-[100px] flex flex-col items-center justify-center'>
        <span className='text-[25px] font-semibold'>Login Page</span>
        <span className='text-[16px]'>Welcome to OneCart, Place your order</span>
      </div>

      {/* Login Card */}
      <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border border-[#96969635] rounded-lg shadow-lg flex items-center justify-center'>
        <form className='w-[90%] flex flex-col gap-5' onSubmit={handleLogin}>
          {/* Google Login - Optional */}
          <div
            className='bg-[#42656cae] py-3 rounded-lg flex items-center justify-center gap-3 cursor-pointer'
            onClick={() => toast.info("Google login not implemented")}>
            <img src={google} className='w-5' alt="Google" />
            Login with Google
          </div>

          {/* OR Divider */}
          <div className='flex items-center justify-center gap-3 text-sm'>
            <div className='w-[40%] h-[1px] bg-[#96969635]' />
            OR
            <div className='w-[40%] h-[1px] bg-[#96969635]' />
          </div>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='h-[50px] px-4 rounded-lg bg-transparent border-2 border-[#96969635] placeholder-white font-semibold'
          />

          {/* Password Input with Toggle */}
          <div className='relative w-full'>
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='h-[50px] px-4 w-full rounded-lg bg-transparent border-2 border-[#96969635] placeholder-white font-semibold'
            />
            {
              show
                ? <IoEye className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer' onClick={() => setShow(false)} />
                : <IoEyeOutline className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer' onClick={() => setShow(true)} />
            }
          </div>

          {/* Submit Button */}
          <button type="submit" className='h-[50px] bg-[#6060f5] rounded-lg font-semibold'>
            {loading ? "...Loading" : "Login"}
          </button>

          {/* Signup Redirect */}
          <p className='text-sm'>
            Don't have an account?
            <span className='text-[#5555f6cf] ml-2 font-semibold cursor-pointer' onClick={() => navigate("/signup")}>
              Create New Account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
