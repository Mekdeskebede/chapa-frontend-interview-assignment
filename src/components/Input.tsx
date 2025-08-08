import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  className?: string;
}

const Input: React.FC<InputProps> = ({ icon, className = "", ...props }) => (
  <div className={`relative flex items-center ${className}`}>
    {icon && (
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center">
        {icon}
      </span>
    )}
    <input
      {...props}
      className={`${className} w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none text-gray-700 text-sm transition-all duration-200 font-medium`}
    />
  </div>
);

export default Input;
