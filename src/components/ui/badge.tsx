import { Chip, SxProps, Theme } from '@mui/material';

interface BadgeProps {
  children: string;
  className?: string;
  mode?: 'standard' | 'outline';
  sx?: SxProps<Theme>;
}

export function Badge({ children, mode = 'standard', className, sx }: BadgeProps) {
  return (
    <Chip
      label={children}
      className={className}
      sx={{
        height: '24px',
        fontSize: '0.7rem',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        borderRadius: '8px', 
        cursor: 'default',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid',
        
        ...(mode === 'standard' ? {
          bgcolor: 'rgba(168, 85, 247, 0.1)',
          color: '#a855f7',
          borderColor: 'rgba(168, 85, 247, 0.2)',
          '&:hover': {
            bgcolor: 'rgba(168, 85, 247, 0.2)',
            borderColor: '#a855f7',
            transform: 'translateY(-1px)',
          },
        } : {
          bgcolor: 'transparent',
          color: 'rgba(255, 255, 255, 0.5)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.4)',
            color: '#fff',
            transform: 'translateY(-1px)',
          },
        }),

        ...sx,
      }}
    />
  );
}