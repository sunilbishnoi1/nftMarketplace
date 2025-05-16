import { useGlobalState } from "../store";

const Loading = () => {
    const [loading] = useGlobalState('loading')

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.8)] z-50">
      <div className="relative p-8 bg-gradient-to-br from-[#10001a] to-[#190727] rounded-lg border-2 border-[#d1aaff] shadow-lg">
        <div className="flex flex-col items-center">
          {/* Loading animation container */}
          <div className="relative w-16 h-16 mb-4">
            {/* Outer rotating square */}
            <div className="absolute inset-0 border-4 border-[#d1aaff] rounded animate-spin"></div>
            {/* Inner pulsing square */}
            <div className="absolute inset-4 bg-[#aa66ff] rounded animate-pulse"></div>
          </div>
          {/* Loading text with shimmer effect */}
          <div className="text-xl font-bold relative">
            <span className="text-[#d1aaff] animate-pulse">Processing...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
