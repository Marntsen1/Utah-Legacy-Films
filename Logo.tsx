import React from 'react';

// NOTE: Please ensure you save your logo image as "logo.png" in your public folder
export const LogoIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <img 
    src="/logo.png" 
    alt="Utah Legacy Films Logo" 
    className={`${className} object-contain mix-blend-multiply`}
  />
);

export default LogoIcon;