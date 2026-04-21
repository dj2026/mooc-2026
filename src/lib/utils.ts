import { SxProps, Theme } from '@mui/material';

/**
 * Utilitat per combinar múltiples objectes sx de MUI de forma neta.
 * Permet condicionals: sx(estilBase, isActive && estilActiu)
 */
type SxInput = SxProps<Theme> | undefined | null | boolean;

export function sx(...inputs: SxInput[]): SxProps<Theme> {
  // Filtrem valors "falsy" (false, null, undefined)
  const filtered = inputs.filter((input): input is SxProps<Theme> => 
    Boolean(input) && typeof input !== 'boolean'
  );

  // Si només n'hi ha un, el retornem directament
  if (filtered.length === 1) return filtered[0];
  
  // Si n'hi ha diversos, MUI accepta un array de SxProps
  return filtered as SxProps<Theme>;
}