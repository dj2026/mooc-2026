import React from 'react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography, Link as MuiLink, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next'; 

interface FooterLinkProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
}

function FooterLink({ children, to, href }: FooterLinkProps) {
  const styles = { 
    color: 'text.secondary', 
    fontWeight: 600, 
    fontSize: '1rem', 
    textDecoration: 'none', 
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
    display: 'inline-block', 
    '&:hover': { color: 'primary.main', transform: 'translateX(6px)' } 
  };
  if (to) return <RouterLink to={to} style={{ textDecoration: 'none' }}><Box component="span" sx={styles}>{children}</Box></RouterLink>;
  return <MuiLink href={href} target="_blank" rel="noopener noreferrer" sx={styles}>{children}</MuiLink>;
}

export function Footer() {
  const { t } = useTranslation();
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ 
      bgcolor: 'background.default', 
      position: 'relative', 
      width: '100vw', 
      left: '50%', 
      right: '50%', 
      marginLeft: '-50vw', 
      marginRight: '-50vw', 
      overflow: 'hidden', 
      borderTop: `1px solid ${theme.palette.divider}`, 
      pt: 10, 
      pb: 5 
    }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
        
        {/* Glow Effect */}
        <Box sx={{ position: 'absolute', bottom: '-110px', left: '50%', transform: 'translateX(-50%)', width: '1000px', height: '300px', bgcolor: 'primary.main', opacity: 0.1, filter: 'blur(120px)', pointerEvents: 'none', borderRadius: '50%' }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={17}>
            
            {/* Logo Section */}
            <Grid size={{ xs: 12, md: 5 }}>
              <RouterLink to="/" style={{ textDecoration: 'none' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                  <Typography variant="h4" component="span" sx={{ filter: 'drop-shadow(0 0 12px ' + theme.palette.primary.main + '80)' }}>🚀</Typography>
                  <Typography variant="h5" component="div" sx={{ fontWeight: 900, color: 'text.primary', letterSpacing: '-1px', fontSize: '1.75rem' }}>
                    MOOC <Box component="span" sx={{ color: 'primary.main' }}>{t('footer.brand_name').replace('MOOC ', '')}</Box>
                  </Typography>
                </Box>
              </RouterLink>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, maxWidth: '380px', fontSize: '1.1rem' }}>
                {t('footer.brand_tagline')}
              </Typography>
            </Grid>

            {/* Explora */}
            <Grid size={{ xs: 6, md: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary', fontWeight: 800, mb: 4, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.75rem' }}>{t('footer.explore')}</Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <li><FooterLink to="/courses">{t('footer.courses')}</FooterLink></li>
                <li><FooterLink to="/challenges">{t('footer.challenges')}</FooterLink></li>
                <li><FooterLink to="/path">{t('footer.paths')}</FooterLink></li>
              </Box>
            </Grid>

            {/* Comunitat */}
            <Grid size={{ xs: 6, md: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary', fontWeight: 800, mb: 4, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.75rem' }}>{t('footer.community')}</Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <li><FooterLink href="#">{t('footer.discord')}</FooterLink></li>
                <li><FooterLink href="#">{t('footer.blog')}</FooterLink></li>
                <li><FooterLink href="#">{t('footer.events')}</FooterLink></li>
              </Box>
            </Grid>

            {/* Connecta */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary', fontWeight: 800, mb: 4, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.75rem' }}>{t('footer.connect')}</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {['GH', 'TW', 'IN'].map((social) => (
                  <Box key={social} component="a" href="#" sx={{ width: 50, height: 50, borderRadius: '12px', border: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.primary', textDecoration: 'none', fontWeight: 800, transition: '0.4s', '&:hover': { bgcolor: 'primary.main' + '1A', borderColor: 'primary.main', color: 'primary.main', transform: 'translateY(-5px)' } }}>{social}</Box>
                ))}
              </Box>
            </Grid>
          </Grid>

          {/* Bottom Bar */}
          <Box sx={{ mt: 10, pt: 4, borderTop: '1px solid', borderColor: 'divider', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 4 }}>
            <Typography sx={{ color: 'text.secondary', opacity: 0.5, fontSize: '0.8rem', fontWeight: 600 }}>
              © {currentYear} {t('footer.copyright')}
            </Typography>
            <Typography component="div" sx={{ color: 'text.secondary', opacity: 0.3, fontSize: '0.7rem', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ width: 8, height: 8, bgcolor: 'success.main', borderRadius: '50%', boxShadow: '0 0 10px success.main' }} />
              {t('footer.systems_operational')} • v6.0.4
            </Typography>
          </Box>
        </Container>
      </motion.div>
    </Box>
  );
}