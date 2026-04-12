
"use client";
import LoginForm from '@/components/forms/login-form';
import React, { useState } from 'react'

const Login = () => {
    const [formType , setFormType] = useState("Login");
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      {/* it has 2 states each state rendering a different form */}
      {/* default form login form */}
      <div>
        <img src="/logo.png" className="w-30" alt="" />
        <LoginForm/>
      </div>
    </div>
  );
}

export default Login