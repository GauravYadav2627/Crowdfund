// import React, { useContext } from "react";
// import { Route, Navigate } from "react-router-dom";
// import { AuthContext } from "./AuthContext";

// const ProtectedRoute = ({ role, ...props }) => {
//   const { isLoggedIn, userRole } = useContext(AuthContext);

//   if (!isLoggedIn) {
//     return <Navigate to="/login" replace />;
//   }

//   if (role && userRole !== role) {
//     return <Navigate to="/" replace />;
//   }

//   return <Route {...props} />;
// };

// export default ProtectedRoute;
