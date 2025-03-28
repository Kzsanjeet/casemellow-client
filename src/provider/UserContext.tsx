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


// "use client";
// import React, { createContext, FC, ReactNode, useState, useEffect } from "react";

// // Define user type
// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   number?: string;
// }

// // Define context type
// interface UserContextType {
//   user: User | null;
//   setUser: (user: User | null) => void;
// }

// // Create context with a default empty object
// export const UserContext = createContext<UserContextType>({
//   user: null,
//   setUser: () => {},
// });

// // Provider component
// const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
//   // Initialize user state, load from localStorage if available
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(()=>{
//     const storedUser = localStorage.getItem("user");
//     if(storedUser){
//       setUser(JSON.parse(storedUser))
//     }
//   },[])

//   // Save user to localStorage whenever it changes
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user)); // Save to localStorage
//     } else {
//       localStorage.removeItem("user"); // Remove from localStorage if user is null
//     }
//   }, [user]);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserProvider;





