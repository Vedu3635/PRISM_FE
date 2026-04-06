import React from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const MotionReveal = ({ children, delay = 0 }) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut', delay }}
    >
      {children}
    </MotionDiv>
  );
};

export default MotionReveal;

