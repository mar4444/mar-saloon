import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { schema } from '../utils/schema.js'
import useAuthStore from "../store/authStore";
import api from '../utils/api.js'
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Loader
} from "lucide-react";
import ErrorMessage from "../components/ErrorMessage.jsx";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    loading,
    error,
    onSubmit,
  } = useAuthStore();

  const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema), });

  const handleLogin = async (data) => {
    const success = await onSubmit(data);

    if (success) {
      navigate("/dashboard");
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-500">
            Login to your account
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="space-y-5"
        >
          {/* error */}
          {error && <ErrorMessage message={error} />}
          {/* Email */}

          <div className="">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <div className="flex items-center rounded-lg border border-gray-300 px-3 focus-within:border-green-600">
              <Mail
                size={20}
                className="text-gray-400"
              />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                {...register("email")}
                className="w-full px-3 py-3 outline-none"
              />
            </div>
            <p className="text-red-500 text-sm mb-2">{errors.email?.message}</p>
          </div>

          {/* Password */}

          <div className="">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="flex items-center rounded-lg border border-gray-300 px-3 focus-within:border-green-600">
              <Lock
                size={20}
                className="text-gray-400"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter your password"
                {...register("password")}
                className="w-full px-3 py-3 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
            <p className="text-red-500 text-sm mb-2">{errors.password?.message}</p>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm font-medium text-green-700 hover:underline cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 cursor-pointer"
          >
            {loading ? (<Loader size={22} className="animate-spin" />) : ('Login')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;