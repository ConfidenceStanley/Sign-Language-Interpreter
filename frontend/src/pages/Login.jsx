import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { RiMailLine, RiLockLine, RiSignalTowerLine, RiArrowRightLine, RiSunLine, RiMoonLine } from "react-icons/ri";

export default function Login() {
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to sign in. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex">

      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent" />
        <div className="absolute inset-0 bg-bg/40" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
              <RiSignalTowerLine size={20} className="text-white" />
            </div>
            <span className="font-semibold text-txt text-lg">SignBridge</span>
          </Link>

          <div className="max-w-md">
            <h2 className="text-3xl font-bold text-txt mb-4 leading-tight">
              Breaking barriers in communication through technology
            </h2>
            <p className="text-txt-secondary leading-relaxed">
              SignBridge empowers deaf and hard of hearing individuals to communicate
              effortlessly with the hearing world using real time AI powered sign
              language interpretation.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-txt-secondary">System Online</span>
            </div>
          </div>
        </div>

        <div className="absolute top-1/4 right-0 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 relative">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="absolute top-6 right-6 w-9 h-9 rounded-lg bg-surface border border-border text-txt-secondary hover:text-txt flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <RiMoonLine size={17} /> : <RiSunLine size={17} />}
        </button>

        <div className="w-full max-w-[420px]">

          <div className="lg:hidden flex justify-center mb-10">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
                <RiSignalTowerLine size={20} className="text-white" />
              </div>
              <span className="font-semibold text-txt text-lg">SignBridge</span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-txt mb-2">Welcome back</h1>
            <p className="text-txt-secondary text-sm">Enter your credentials to access your account</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
              placeholder="Enter your password"
              icon={RiLockLine}
              error={errors.password?.message}
              {...register("password", { required: "Please enter your password" })}
            />

            <Button type="submit" loading={loading} className="w-full py-3 mt-1">
              Sign in
              <RiArrowRightLine size={16} />
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-txt-muted">
              New to SignBridge?{" "}
              <Link to="/register" className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors">
                Create an account
              </Link>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}