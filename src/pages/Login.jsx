import React, { useState } from "react";
import { toast } from "react-toastify";
import FormWrapper from "../components/FormWrapper";
import { loginFormConfig } from "../utils/Config";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import { validateEmail, validatePassword } from "../utils/validator";

const Login = () => {
  const navigate = useNavigate();
  const { request } = useApi();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (formData) => {
    setLoading(true);
    try {
      const data = await request({
        method: "POST",
        url: "/auth/login",
        data: formData,
        auth: false,
      });

      // Store user data in localStorage after login
      localStorage.setItem('user', JSON.stringify(data));
      toast.success("Login successful");

      const role = data?.role?.toUpperCase();
      if (role === "ADMIN" || role === "READONLY") {
        navigate("/usermanagement");
      } else if (role === "CUSTOMER") {
        navigate("/costexplorer");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const validateField = (name, value) => {
    const validators = {
      email: validateEmail,
      password: validatePassword,
    };
    const validatorFn = validators[name];
    return validatorFn ? validatorFn(value) || "" : "";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white px-10 py-6 rounded-xl shadow-md w-full max-w-md">
        <div className="flex flex-col items-center space-y-4 mb-6 pt-6">
          <img src="/image.png" alt="Logo" className="h-16 object-contain" />
          <h2 className="text-3xl font-bold text-center mt-4">Login</h2>
        </div>

        <FormWrapper 
          formFields={loginFormConfig}
          buttonText="Login"
          loadingText="Logging in..."
          onSubmit={handleLogin}
          validateField={validateField}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default Login;
