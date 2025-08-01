import React, { useContext, useState } from 'react';
import Logo from '../assets/logo.png';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { serverUrl } = useContext(authDataContext);
  // const { getAdmin } = useContext(adminDataContext);
  const {adminData , getAdmin} = useContext(adminDataContext)
  const navigate = useNavigate();

  const AdminLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/adminlogin`,
        { email, password },
        { withCredentials: true }
      );
       toast.success("AdminLogin Successfully");

    await getAdmin(); // wait for admin data
    navigate("/");
                // Redirect to home/dashboard
    } catch (error) {
      console.log("❌ Login Failed:", error.response?.data?.message || error.message);
      toast.error("AdminLogin Failed")
    }
  };

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center'>
      
      {/* Header */}
      <div className='w-full h-[80px] flex items-center px-8 gap-3 cursor-pointer'>
        <img className='w-[40px]' src={Logo} alt="Logo" />
        <h1 className='text-[22px] font-sans'>OneCart</h1>
      </div>

      {/* Title */}
      <div className='h-[100px] flex flex-col items-center justify-center'>
        <span className='text-[25px] font-semibold'>Login Page</span>
        <span className='text-[16px]'>Welcome to OneCart, Apply to Admin Login</span>
      </div>

      {/* Login Card */}
      <div className='max-w-[600px] w-[90%] h-[400px] bg-[#00000025] border border-[#96969635] rounded-lg shadow-lg flex items-center justify-center'>
        <form className='w-[90%] flex flex-col gap-5' onSubmit={AdminLogin}>
          
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
            Login
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;
