
import React from 'react';
import Navbar from '@/components/Navbar';
import AuthForm from '@/components/AuthForm';
import Footer from '@/components/Footer';

const Signup = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-32 pb-20 px-6">
        <AuthForm type="signup" />
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
