// components/LoadingSpinner.jsx
export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#F32D17]"></div>
      <p className="ml-4 text-[#5E000C]">Loading...</p>
    </div>
  );
}