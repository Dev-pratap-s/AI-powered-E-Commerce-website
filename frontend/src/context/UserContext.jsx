// src/context/UserContext.jsx
import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthDataContext } from './authContext';  

export const userDataContext = createContext();

function UserContext({ children }) {
  let [userData, setuserData] = useState("");
  let { serverUrl } = useContext(AuthDataContext);  // ✅ Destructuring serverUrl

  const getCurrentUser = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/user/getcurrentuser",{withCredentials:true})
      setuserData(result.data);
      console.log("User Data current:", result.data);
    } catch (error) {
      setuserData(null);
      console.log("Error fetching user:", error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  let value = {
    userData,
    setuserData,
    getCurrentUser
  }

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
