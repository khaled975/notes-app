import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function PassInput({ value, onChange }) {
  const [showPassword, isShowPassword] = useState(false);
  const togglePassword = () => {
    isShowPassword(!showPassword);
  };
  return (
    <div className="flex items-center border border-slate-400 px-4 py-2 rounded-sm">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder="Enter your password"
        className="w-full rounded-sm text-sm bg-transparent outline-none "
      />
      {showPassword ? (
        <FaRegEye
          onClick={togglePassword}
          className="cursor-pointer text-primary"
        />
      ) : (
        <FaRegEyeSlash
          onClick={togglePassword}
          className="cursor-pointer text-primary"
        />
      )}
    </div>
  );
}

export default PassInput;
