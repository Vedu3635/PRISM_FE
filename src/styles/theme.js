import { createTheme } from '@mui/material/styles';

const prismTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0B0D14', // Deep obsidian
      paper: '#131826', // Slightly lighter blue-tinged gray for cards
    },
    primary: {
      main: '#3B82F6', // Vibrant Blue
      light: '#60A5FA',
      dark: '#2563EB',
    },
    secondary: {
      main: '#8B5CF6', // Violet accent
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#131826',
          borderRadius: 16,
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          backgroundImage: 'none', // Remove MUI default elevation overlay
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default prismTheme;
