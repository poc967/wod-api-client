import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = (props) => {
  console.log(props);
  return props.isAuthenticated ? props.children : <Navigate to="/login" />;
};

export default PrivateRoute;
