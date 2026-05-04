import { Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

const languages = [{code: 'ca', label: 'CA'},{code: 'es', label: 'ES'},{code: 'en', label: 'EN'}];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <Stack direction="row" sx={{ bgcolor: 'action.hover', borderRadius: '12px', p: 0.5}}>
      {languages.map((lang) => (<Button key={lang.code} onClick={() => i18n.changeLanguage(lang.code)} sx={{ minWidth: '35px', px: 1, fontSize: '0.7rem', fontWeight: 800, color: i18n.language === lang.code ? 'text.primary' : 'text.secondary', bgcolor: i18n.language === lang.code ? 'primary.main' + '33' : 'transparent', '&:hover': { bgcolor: 'primary.main' + '1A' } }}>{lang.label}</Button>))}
    </Stack>
  );
}
