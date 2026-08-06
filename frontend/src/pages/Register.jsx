import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { RiMailLine, RiLockLine, RiUserLine, RiSignalTowerLine } from "react-icons/ri";

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
      setError(err.response?.data?.detail || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
              <RiSignalTowerLine size={20} className="text-white" />
            </div>
            <span className="font-semibold text-white text-lg">SignBridge</span>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-white mb-1">Create your account</h2>
          <p className="text-sm text-gray-400 mb-6">Start interpreting sign language today</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              label="Full name"
              type="text"
              placeholder="John Doe"
              icon={RiUserLine}
              error={errors.full_name?.message}
              {...register("full_name", { required: "Full name is required" })}
            />
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              icon={RiMailLine}
              error={errors.email?.message}
              {...register("email", { required: "Email is required" })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={RiLockLine}
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" }
              })}
            />
            <Input
              label="Confirm password"
              type="password"
              placeholder="••••••••"
              icon={RiLockLine}
              error={errors.confirm_password?.message}
              {...register("confirm_password", {
                required: "Please confirm your password",
                validate: val => val === watch("password") || "Passwords do not match"
              })}
            />

            <Button type="submit" loading={loading} className="w-full mt-2 py-3">
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}