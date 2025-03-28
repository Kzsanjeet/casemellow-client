
// "use client"
// import React, { createContext, FC, ReactNode, useState } from "react";

// export interface ICart {
//     _id: string; 
//     clientId: string;
//     productId: {
//       _id: string;
//       name: string;
//       price: number;
//       imageUrl: string;
//     };
//     brandName: string;
//     phoneModel: string;
//     coverType: string;
//     quantity: number;
//     cartDate?: string;
//     createdAt?: string;
//     updatedAt?: string;
//   }
// // Define context type
// interface CartContextType {
//   cart: ICart | null;
//   setCart: (cart: ICart | null) => void;
// }

// // Create context with a default empty object
// export const CartContext = createContext<CartContextType>({
//   cart: null,
//   setCart: () => {},
// });

// // Provider component
// const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
//   const [cart, setCart] = useState<ICart | null>(null);

//   return (
//     <CartContext.Provider value={{ cart, setCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export default CartProvider;




// // "use client"
// // import React, { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react'


// // interface LoginUserType{
// //     isLoggedIn:boolean;
// //     setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
// // }

// // export const LoginUserContext = createContext<LoginUserType | null>(null);

// // // Define the props for the provider component
// // interface LoginUserProviderProps {
// //     children: ReactNode; // Properly type the children prop
// //   }

// // const LoginContext: FC<LoginUserProviderProps> = ({children}) => {
// //     const [isLoggedIn,setIsLoggedIn] = useState(false);
// //     console.log(isLoggedIn) 
// //   return (
// //     <LoginUserContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
// //         {children}
// //     </LoginUserContext.Provider>
// //   )
// // }

// // export default LoginContext

// "use client"
// import React, { createContext, useState, useEffect } from 'react';
// import Cookies from 'js-cookie';

// interface LoginUserContextType {
//   isLoggedIn: boolean;
//   setIsLoggedIn: (value: boolean) => void;
// }

// export const LoginUserContext = createContext<LoginUserContextType | undefined>(undefined);

// const LoginUserProvider = ({ children }: { children: React.ReactNode }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
//     // Get the initial value from cookies
//     return Cookies.get("isLoggedIn") === "true";
//   });
//   console.log(isLoggedIn)

//   // Save value to cookies whenever it changes
//   useEffect(() => {
//     Cookies.set("isLoggedIn", isLoggedIn.toString(), { "max-age": 600 });
//   }, [isLoggedIn]);

//   return (
//     <LoginUserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
//       {children}
//     </LoginUserContext.Provider>
//   );
// };

// export default LoginUserProvider;



"use client";
import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface CartContextType {
  isCart: boolean;
  setIsCart: (value: boolean) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCart, setIsCart] = useState<boolean>(() => {
    const storedValue = Cookies.get("isCart");
    return storedValue === "true"; // Ensure conversion to boolean
  });

  console.log("cart In:", isCart);

  // Save value to cookies whenever it changes
  useEffect(() => {
    Cookies.set("isCart", isCart.toString(), { expires: 1 / 144 }); // 10 minutes
  }, [isCart]);

  return (
    <CartContext.Provider value={{ isCart, setIsCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;


