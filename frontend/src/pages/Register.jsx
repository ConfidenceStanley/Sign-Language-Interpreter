import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { RiMailLine, RiLockLine, RiUserLine, RiSignalTowerLine, RiArrowRightLine, RiShieldCheckLine } from "react-icons/ri";

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      await registerUser(data.full_name, data.email, data.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    "Real time sign language interpretation",
    "Voice output for seamless communication",
    "Personal dictionary and learning tools",
    "Session history and progress tracking",
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">

      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent" />
        <div className="absolute inset-0 bg-[#0a0a0f]/40" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
              <RiSignalTowerLine size={20} className="text-white" />
            </div>
            <span className="font-semibold text-white text-lg">SignBridge</span>
          </Link>

          <div className="max-w-md">
            <h2 className="text-3xl font-bold text-white mb-6 leading-tight">
              Start communicating without limits today
            </h2>
            <div className="flex flex-col gap-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-indigo-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <RiShieldCheckLine size={12} className="text-indigo-400" />
                  </div>
                  <span className="text-gray-300 text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-400">Free to use</span>
            </div>
          </div>
        </div>

        <div className="absolute top-1/3 right-0 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[420px]">

          <div className="lg:hidden flex justify-center mb-10">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
                <RiSignalTowerLine size={20} className="text-white" />
              </div>
              <span className="font-semibold text-white text-lg">SignBridge</span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Create your account</h1>
            <p className="text-gray-400 text-sm">Join SignBridge and start interpreting sign language instantly</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <Input
              label="Full name"
              type="text"
              placeholder="Enter your full name"
              icon={RiUserLine}
              error={errors.full_name?.message}
              {...register("full_name", { required: "Please enter your full name" })}
            />
            <Input
              label="Email address"
              type="email"
              placeholder="Enter your email"
              icon={RiMailLine}
              error={errors.email?.message}
              {...register("email", { required: "Please enter your email address" })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Create a password"
              icon={RiLockLine}
              error={errors.password?.message}
              {...register("password", {
                required: "Please create a password",
                minLength: { value: 6, message: "Password must be at least 6 characters" }
              })}
            />
            <Input
              label="Confirm password"
              type="password"
              placeholder="Confirm your password"
              icon={RiLockLine}
              error={errors.confirm_password?.message}
              {...register("confirm_password", {
                required: "Please confirm your password",
                validate: val => val === watch("password") || "Passwords do not match"
              })}
            />

            <Button type="submit" loading={loading} className="w-full py-3 mt-1">
              Create account
              <RiArrowRightLine size={16} />
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}