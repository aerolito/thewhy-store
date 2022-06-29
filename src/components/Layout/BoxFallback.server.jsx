export function BoxFallback() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 bg-black opacity-30 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-black opacity-70 rounded-full animate-bounce delayOne"></div>
        <div className="w-4 h-4 bg-black rounded-full animate-bounce delayTwo"></div>
      </div>
    </div>
  );
}
