import { useGlobalState } from "../store";

const Loading = () => {
  const [loading] = useGlobalState('loading');

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-md z-[100]">
      <div className="relative">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 rounded-2xl blur-2xl opacity-30 animate-pulse"></div>
        
        {/* Main container */}
        <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-12 shadow-2xl">
          <div className="flex flex-col items-center space-y-6">
            {/* Loader Animation */}
            <div className="relative w-24 h-24">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-500 border-r-fuchsia-500 animate-spin"></div>
              
              {/* Middle rotating ring */}
              <div className="absolute inset-3 rounded-full border-4 border-transparent border-t-pink-500 border-r-violet-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              
              {/* Inner pulsing core */}
              <div className="absolute inset-6 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 animate-pulse"></div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 blur-xl opacity-40 animate-pulse"></div>
            </div>
            
            {/* Loading text */}
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Processing
              </h3>
              <p className="text-sm text-gray-400 animate-pulse">
                {loading.msg || 'Please wait...'}
              </p>
            </div>
            
            {/* Animated dots */}
            <div className="flex space-x-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
