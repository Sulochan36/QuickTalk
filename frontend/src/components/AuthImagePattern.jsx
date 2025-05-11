import { FaLock, FaUserAlt, FaComments, FaRocket, FaCheckCircle, FaSmile } from "react-icons/fa";

const icons = [FaLock, FaUserAlt, FaComments, FaRocket, FaCheckCircle, FaSmile];

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {icons.map((Icon, i) => (
            <div
              key={i}
              className="aspect-square flex items-center justify-center text-3xl hover:scale-105 transition border-2 rounded-3xl animate-pulse"
            >
              <Icon />
            </div>
          ))}
        </div>
        <h2 className="text-4xl font-bold mb-3">{title}</h2>
        <p className="text-2xl">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
