import { useTransition, animated, useSpring } from '@react-spring/web';
import { Box, Alert, Typography, IconButton } from '@mui/material';
import { X } from 'lucide-react';
import type { Toast } from '../../contexts/NotificationContext';

interface NotificationHubProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

const ToastProgress = ({ duration }: { duration: number }) => {
  const props = useSpring({
    from: { width: '100%' },
    to: { width: '0%' },
    config: { duration },
  });
  return (<animated.div style={{...props,height: '4px',background: 'linear-gradient(90deg, #00f2ff, #00d4ff)',position: 'absolute',bottom: 0,left: 0}}/>);
};

export function NotificationHub({ toasts, onRemove }: NotificationHubProps) {
  const transitions = useTransition(toasts, {
    keys: (t: Toast) => t.id, from: { opacity: 0, transform: 'translateX(100%)' },enter: { opacity: 1, transform: 'translateX(0%)' },leave: { opacity: 0, transform: 'translateX(100%)' }, config: { tension: 150, friction: 20 }});

  return (
    <Box sx={{position: 'fixed', top: 100, right: 20, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 1.5, pointerEvents: 'none'}}>
      {transitions((style, t) => (
        <animated.div style={{ ...style, pointerEvents: 'auto' }}>
          <Alert severity={t.severity} variant="filled" sx={{ minWidth: 320, bgcolor: '#546067',color: 'white', position: 'relative', overflow: 'hidden',borderRadius: '4px 4px 0 0', '& .MuiAlert-icon': { color: 'white' }}}
            action={<IconButton size="small" onClick={() => onRemove(t.id)} sx={{ color: 'white', opacity: 0.7 }}><X size={16} /></IconButton>}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 900 }}>
              {t.message}
            </Typography>
            <ToastProgress duration={2000} />
          </Alert>
        </animated.div>
      ))}
    </Box>
  );
}
