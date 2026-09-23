/**
 * Resolves asset URLs correctly across GitHub Pages subfolder (e.g. /-Prakash-Hospital/),
 * custom root domains (e.g. prakashhospital.in), and local development.
 * Idempotent: safe if called multiple times on the same path.
 */
export const getAssetUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }

  const rawBase = import.meta.env.BASE_URL || './';
  const normalizedBase = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

  // If path already starts with normalizedBase (e.g. "/-Prakash-Hospital/assets/..."), return it directly
  if (normalizedBase !== './' && normalizedBase !== '/' && path.startsWith(normalizedBase)) {
    return path;
  }

  // Also check without leading slash
  const trimmedBase = normalizedBase.startsWith('/') ? normalizedBase.slice(1) : normalizedBase;
  if (trimmedBase && path.startsWith(trimmedBase)) {
    return `/${path}`;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${normalizedBase}${cleanPath}`;
};

