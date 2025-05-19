import { FaRegTimesCircle } from "react-icons/fa";
import { BsCheck2Circle } from "react-icons/bs";
import { useGlobalState } from "../store";

const Alert = () => {
  const [alert] = useGlobalState("alert");

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen
      flex items-center justify-center
      bg-black bg-opacity-50
      transform transition-transform duration-300 scale-100"
    >
      <div
        className="flex flex-col justify-center items-center
        bg-[#c8a2c8] shadow-xl shadow-[#8a69c8]
        rounded-xl min-w-min py-3 px-10"
      >
        {alert.color === "red" ? (
          <>
            <FaRegTimesCircle className="text-red-600 text-4xl" />
            <p className="text-white">Message...</p>
          </>
        ) : (
          <>
            <BsCheck2Circle className="text-green-600 text-4xl" />
            <p className="text-white">Message...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Alert;
