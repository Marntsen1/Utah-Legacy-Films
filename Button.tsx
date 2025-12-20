import React from 'react';
import { motion } from 'framer-motion';
import { ButtonProps } from '../../types';

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', onClick, className = '' }) => {
  const baseClasses = "relative px-8 py-3 rounded-full font-medium text-sm tracking-wide transition-all duration-300 group overflow-hidden border";
  
  const variants = {
    primary: "text-[#f5f2eb] bg-[#362b24] border-[#362b24] hover:bg-[#2e231e] hover:shadow-[0_4px_20px_rgba(54,43,36,0.2)]",
    secondary: "text-[#362b24] border-[#362b24]/30 bg-transparent hover:bg-[#362b24]/5 hover:border-[#362b24]",
    outline: "text-[#85756b] border-[#85756b]/30 hover:border-[#c06e46] hover:text-[#c06e46] bg-transparent",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {/* Inner Glow for Primary - Centered expanding radial gradient */}
      {variant === 'primary' && (
        <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform duration-700 ease-out rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_60%)] z-0" />
      )}

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {/* Beam effect for primary button */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
      )}
    </motion.button>
  );
};

export default Button;