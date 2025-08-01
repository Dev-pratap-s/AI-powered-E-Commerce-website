import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthDataContext } from "./authContext";
import axios from "axios";

export const shopDataContext = createContext();

function ShopContext({ children }) {
  let [products, setProducts] = useState([]);
  let [search, setSearch] = useState("");
  let [showSearch, setShowSearch] = useState(false);
  let { serverUrl } = useContext(AuthDataContext);
  let { userData } = useContext(AuthDataContext);

  let [cartItem, setCartItem] = useState({});
  let currency = "₹";
  let delivery_fee = 40;

  const getProducts = async () => {
     console.log("Fetching products...");  // ✅ Step 1 check
    try {
      let result = await axios.get(serverUrl + "/api/product/list");
      console.log(result.data);
      console.log(result.message)
      
      setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };



  const updateQuantity = async (itemId , size , quantity) => {
      let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity
    setCartItem(cartData)

    if (userData) {
      try {
        await axios.post(serverUrl + "/api/cart/update", { itemId, size, quantity }, { withCredentials: true })
      } catch (error) {
        console.log(error)
        
      }
    }
      
    }
 
    const getCartAmount = () => {
  let totalAmount = 0;
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += itemInfo.price * cartItem[items][item];
          }
        } catch (error) {
          console.log(error);
          

        }
      }
    }
    return totalAmount
    
  }




  const addToCart = async (itemId, size) => {
   try {
  let result = await axios.post(
    serverUrl + "/api/cart/add",
    { itemId, size },
    { withCredentials: true }
  );

  console.log("🟢 result =>", result);
  console.log("🟢 result.data =>", result.data);

  await getUserCart();

} catch (error) {
  console.log("🔴 error.response =>", error.response);
 
}

  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalCount += cartItem[items][item];
          }
        } catch (error) {
          console.log(error);
          
        }
      }
    }
    return totalCount;
  };


 
    const getUserCart = async () => {
      try {
        const result = await axios.post(serverUrl + '/api/cart/get',{},{ withCredentials: true })

      setCartItem(result.data)
    } catch (error) {
      console.log(error)
     


    }
      
    }

  useEffect(() => {
  console.log("🔥 useEffect inside ShopContext running...");
  getProducts();
  getUserCart()
}, []);

  ;

  let value = {
    products,
    currency,
    delivery_fee,
    getProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    addToCart,
    getCartCount,
    setCartItem,
    updateQuantity,
    getCartAmount
  };

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );
}

export default ShopContext;
