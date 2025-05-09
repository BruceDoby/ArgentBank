import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App'
import SignIn from './pages/sign-in'
import Header from './Header';
import Footer from './Footer';
import User from './pages/user';
import PrivateRoute from './components/privateRoute';
import Error from './pages/error';

const AppRooter = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user" element={<PrivateRoute><User /></PrivateRoute>} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRooter;