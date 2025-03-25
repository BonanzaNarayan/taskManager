// Preloader component
export default function Preloader() {
  return (
    <div className="flex space-x-2 justify-center items-center">
      <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce delay-100"></div>
      <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce delay-200"></div>
    </div>
  )
}