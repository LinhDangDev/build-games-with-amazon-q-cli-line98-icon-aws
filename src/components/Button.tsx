import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = "px-4 py-2 rounded-lg transition-all duration-300 font-medium";

  const variantStyles = {
    default: "bg-gray-800 hover:bg-gray-700 text-white",
    outline: "bg-transparent border border-gray-300 hover:bg-gray-100"
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
