import { useState, forwardRef } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

const Input = forwardRef(({ label, error, icon: Icon, type, className = "", ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-300">{label}</label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={17} />
          </div>
        )}
        <input
          ref={ref}
          type={isPassword && showPassword ? "text" : type}
          className={`w-full bg-white/[0.04] border ${error ? "border-red-500/50" : "border-white/10 focus:border-indigo-500/50"} text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 ${error ? "focus:ring-red-500/20" : "focus:ring-indigo-500/20"} transition-all duration-200 ${Icon ? "pl-11" : ""} ${isPassword ? "pr-11" : ""} ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
          >
            {showPassword ? <RiEyeOffLine size={17} /> : <RiEyeLine size={17} />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-400 mt-0.5">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";
export default Input;