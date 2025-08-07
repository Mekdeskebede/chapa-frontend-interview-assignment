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
            className={`${className} w-full pl-10 pr-3 py-2 border rounded-full focus:ring-0 focus:outline-none text-gray-600 text-sm`}
        />
    </div>
);

export default Input;
