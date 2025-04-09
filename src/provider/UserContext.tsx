// // "use client"
// // import React, { createContext, FC, ReactNode, useState } from "react";

// // // Define user type
// // interface User {
// //   _id: string;
// //   name: string;
// //   email: string;
// //   number?: string;
// // }

// // // Define context type
// // interface UserContextType {
// //   user: User | null;
// //   setUser: (user: User | null) => void;
// // }

// // // Create context with a default empty object
// // export const UserContext = createContext<UserContextType>({
// //   user: null,
// //   setUser: () => {},
// // });

// // // Provider component
// // const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
// //   const [user, setUser] = useState<User | null>(null);

// //   return (
// //     <UserContext.Provider value={{ user, setUser }}>
// //       {children}
// //     </UserContext.Provider>
// //   );
// // };

// // export default UserProvider;


"use client";
import React, { createContext, FC, ReactNode, useState, useEffect } from "react";

// Define user type
interface User {
  _id: string;
  name: string;
  email: string;
  number?: string;
}

// Define context type
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Create context
export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

// Provider component
const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;





