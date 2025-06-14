import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  className = '',
  children
}) => {
  return (
    <div className={`rounded-2xl shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;
