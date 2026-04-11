import React from 'react';
import { Box, Typography } from '@mui/material';

const Badge = ({ children, color = "primary", sx }) => {
  const bgColor = color === 'primary' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.1)';
  const textColor = color === 'primary' ? 'primary.light' : 'text.primary';

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 1.5,
        py: 0.5,
        borderRadius: '16px',
        backgroundColor: bgColor,
        ...sx
      }}
    >
      <Typography variant="caption" sx={{ color: textColor, fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        {children}
      </Typography>
    </Box>
  );
};

export default Badge;
