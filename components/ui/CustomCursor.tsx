import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Adjusted physics for a "calmer", fluid feel
  // Lower stiffness = slower follow (less jumpy)
  // Higher damping = less oscillation/wobble
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Check if the target is interactive (buttons, links, inputs, images with hover)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Expanded list of interactive elements
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'LABEL' ||
        target.closest('button') || 
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('.group') || // Hoverable image groups
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovering(!!isClickable);
    };

    const handleMouseOut = (e: MouseEvent) => {
      // Only set hovering to false, don't hide cursor immediately unless leaving window
      setIsHovering(false);
      
      if (!e.relatedTarget) {
        setIsVisible(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block mix-blend-multiply"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%', // Center the cursor on the mouse point
        translateY: '-50%',
      }}
    >
      {/* The Cursor Ring/Dot */}
      <motion.div 
        className="rounded-full border border-[#c06e46]"
        animate={{
            height: isHovering ? 50 : 20, // Slightly larger hover, slightly larger base
            width: isHovering ? 50 : 20,
            backgroundColor: isHovering ? 'rgba(192, 110, 70, 0.08)' : 'transparent',
            borderWidth: isHovering ? '1px' : '1.5px', // Thinner border on hover for elegance
            scale: isClicking ? 0.9 : 1,
            opacity: isVisible ? 1 : 0
        }}
        // Softer transition for the size change
        transition={{
            type: "spring",
            stiffness: 250, // Reduced from 400
            damping: 25,    // Smoother stop
            mass: 0.8
        }}
      />
      
      {/* Optional: Tiny center dot for precision when not hovering */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#c06e46] rounded-full"
        animate={{
            width: isHovering ? 4 : 4, // Keep dot visible but small on hover for precision anchor
            height: isHovering ? 4 : 4,
            opacity: isHovering ? 0.5 : 1 // Fade out slightly on hover
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

export default CustomCursor;