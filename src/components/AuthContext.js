// import React, { createContext, useState, useEffect } from "react";
// import { jwtDecode } from 'jwt-decode';

// const AuthContext = createContext({
//   isLoggedIn: false,
//   userRole: "",
//   setIsLoggedIn: () => {},
//   setUserRole: () => {},
// });

// const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userRole, setUserRole] = useState("");

//   useEffect(() => {
//     const storedToken = localStorage.getItem("jwtToken");
//     console.log("1",storedToken);
//     if (storedToken) {
//       const decodedToken = jwtDecode(storedToken);
//       setIsLoggedIn(true);
//       setUserRole(decodedToken.role);
//     }
//   }, []);
//   console.log(userRole);

//   const login = (token, role) => {
//     localStorage.setItem("jwtToken", token);
//     setIsLoggedIn(true);
//     setUserRole(role);
//   };
//   console.log(isLoggedIn);

//   const logout = () => {
//     localStorage.removeItem("jwtToken");
//     setIsLoggedIn(false);
//     setUserRole("");
//   };

//   const value = { isLoggedIn, userRole, login, logout };

//   return (
//         <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  
//   );
// };

// export { AuthContext, AuthProvider };