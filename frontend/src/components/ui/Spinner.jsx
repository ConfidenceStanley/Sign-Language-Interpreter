export default function Spinner() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}