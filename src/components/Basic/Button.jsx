import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({ children, variant = "contained", color = "primary", ...props }) => {
  if (variant === 'secondary-dark') {
    return (
      <MuiButton
        variant="contained"
        sx={{
          backgroundColor: 'rgba(255,255,255,0.05)',
          color: 'text.primary',
          border: '1px solid rgba(255,255,255,0.1)',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderColor: 'rgba(255,255,255,0.2)',
          }
        }}
        {...props}
      >
        {children}
      </MuiButton>
    )
  }

  if (variant === 'premium') {
     return (
        <MuiButton
          variant="contained"
          sx={{
            background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
            color: 'white',
            fontWeight: 600,
            px: 4,
            py: 1.5,
            borderRadius: '8px',
            '&:hover': {
               background: 'linear-gradient(135deg, #2563EB 0%, #1e40af 100%)',
            }
          }}
          {...props}
        >
          {children}
        </MuiButton>
     )
  }

  return (
    <MuiButton variant={variant} color={color} {...props}>
      {children}
    </MuiButton>
  );
};

export default Button;
