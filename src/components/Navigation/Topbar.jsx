import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Button from '../Basic/Button';
import { Menu } from 'lucide-react';
const links = [
  "Features", "Vault", "Analytics", "Pricing"
];

const Topbar = () => {
  return (
    <AppBar position="sticky" sx={{
      backgroundColor: 'rgba(11, 13, 20, 0.8)',
      backdropFilter: 'blur(10px)',
      boxShadow: 'none',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      py: 1
    }}>
      <Toolbar sx={{ maxWidth: '1200px', width: '100%', mx: 'auto', display: 'flex', justifyContent: 'space-between', px: { xs: 2, md: 3 } }}>
        <Typography variant="h6" fontWeight="800" component="div">
          PRISM
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
          {links.map(link => (
            <Typography key={link} variant="body2" sx={{
              color: 'text.secondary',
              cursor: 'pointer',
              fontWeight: 500,
              '&:hover': { color: 'text.primary' }
            }}>
              {link}
            </Typography>
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' }, cursor: 'pointer', color: 'text.secondary', '&:hover': { color: 'text.primary' } }}>
            Login
          </Typography>
          <Button variant="premium" sx={{ py: {xs: 0.5, md: 1}, px: {xs: 2, md: 3}, fontSize: '0.875rem' }}>
            Get Started
          </Button>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 1, color: 'text.secondary', cursor: 'pointer' }}>
            <Menu size={24} />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
