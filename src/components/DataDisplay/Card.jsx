import React from 'react';
import { Card as MuiCard, CardContent, Typography, Box } from '@mui/material';

const Card = ({ children, title, subtitle, icon, hoverEffect = true, noPadding = false, ...props }) => {
  return (
    <MuiCard
      sx={{
        transition: 'transform 0.2s, background-color 0.2s',
        '&:hover': hoverEffect ? {
          transform: 'translateY(-4px)',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
        } : {},
      }}
      {...props}
    >
      <CardContent sx={{ p: noPadding ? 0 : 4, '&:last-child': { pb: noPadding ? 0 : 4 } }}>
        {(icon || title || subtitle) && (
          <Box sx={{ mb: 3 }}>
            {icon && (
              <Box sx={{
                mb: 2,
                display: 'inline-flex',
                p: 1.5,
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'primary.light'
              }}>
                {icon}
              </Box>
            )}
            {title && (
              <Typography variant="h5" fontWeight="700" color="text.primary" gutterBottom>
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="body1" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
        {children}
      </CardContent>
    </MuiCard>
  );
};

export default Card;
