export default function LoadingFallback() {
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="absolute top-0 text-center w-full flex justify-center items-center">
          <img
            src="/black-logo.svg"
            width="80px"
            height="80px"
            className="cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-center space-x-2 animate-bounce">
          <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
          <div className="w-8 h-8 bg-green-400 rounded-full"></div>
          <div className="w-8 h-8 bg-black rounded-full"></div>
        </div>
      </div>
    </>
  );
}
