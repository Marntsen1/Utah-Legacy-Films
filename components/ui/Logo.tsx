import React, { useState } from 'react';

// NOTE: Please ensure you save your logo image as "logo.png" in your public folder
// Using a placeholder SVG logo as fallback
export const LogoIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className={`${className} bg-[#c06e46] rounded-lg flex items-center justify-center text-white font-serif font-bold text-xs`}>
        ULF
      </div>
    );
  }

  return (
    <img 
      src="/logo.png" 
      alt="Utah Legacy Films Logo" 
      className={`${className} object-contain mix-blend-multiply`}
      onError={(e) => {
        console.error('Failed to load logo.png');
        console.error('Image src:', e.currentTarget.src);
        console.error('Current URL:', window.location.href);
        setImageError(true);
      }}
      onLoad={() => {
        console.log('Successfully loaded logo.png');
      }}
      loading="eager"
    />
  );
};

export default LogoIcon;
