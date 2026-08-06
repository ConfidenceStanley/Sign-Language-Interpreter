const variants = {
  primary: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30",
  secondary: "bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/10 hover:border-white/20",
  danger: "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20",
  ghost: "bg-transparent hover:bg-white/[0.06] text-gray-300 hover:text-white",
};

export default function Button({ children, variant = "primary", className = "", loading = false, ...props }) {
  return (
    <button
      className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : children}
    </button>
  );
}