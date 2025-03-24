
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

interface LoginUserContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export const LoginUserContext = createContext<LoginUserContextType | undefined>(undefined);

const LoginUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const storedValue = Cookies.get("isLoggedIn");
    return storedValue === "true"; // Ensure conversion to boolean
  });

  console.log("User Logged In:", isLoggedIn);

  // Save value to cookies whenever it changes
  useEffect(() => {
    Cookies.set("isLoggedIn", isLoggedIn.toString(), { expires: 1 / 144 }); // 10 minutes
  }, [isLoggedIn]);

  return (
    <LoginUserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginUserContext.Provider>
  );
};

export default LoginUserProvider;


