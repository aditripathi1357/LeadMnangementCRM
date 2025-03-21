
import React from 'react';
import Navbar from '@/components/Navbar';
import AuthForm from '@/components/AuthForm';
import Footer from '@/components/Footer';

const Login = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-32 pb-20 px-6">
        <AuthForm type="login" />
      </div>
      <Footer />
    </div>
  );
};

export default Login;
