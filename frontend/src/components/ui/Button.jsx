const variants = {
  primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
  secondary: "bg-white hover:bg-gray-100 text-gray-900 border border-gray-200",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  ghost: "bg-transparent hover:bg-white/10 text-white",
};

export default function Button({ children, variant = "primary", className = "", loading = false, ...props }) {
  return (
    <button
      className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : children}
    </button>
  );
}