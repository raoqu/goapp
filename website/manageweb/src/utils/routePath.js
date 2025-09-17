// Lightweight, browser-safe path resolver for route paths
// It mimics the common use of path.resolve(base, route) for URL-like paths
// Examples:
// resolvePath('/', 'a') => '/a'
// resolvePath('/a', 'b') => '/a/b'
// resolvePath('/a/', '/b') => '/b'
// resolvePath('/a', '/b') => '/b'
// resolvePath('/a', '') => '/a'
// External links are returned as-is
export function resolvePath(basePath = '/', routePath = '') {
  if (routePath == null) routePath = ''

  // pass through external URLs/mail/tel
  if (typeof routePath === 'string' && /^(https?:|mailto:|tel:)/.test(routePath)) {
    return routePath
  }

  // absolute path
  if (routePath.startsWith('/')) {
    return routePath
  }

  const cleanBase = (basePath || '').replace(/\/+$/, '') // remove trailing slashes
  const cleanRoute = (routePath || '').replace(/^\/+/, '') // remove leading slashes

  // if base empty, ensure leading slash
  if (!cleanBase) {
    return '/' + cleanRoute
  }

  // if route empty, return base (or '/')
  return cleanRoute ? `${cleanBase}/${cleanRoute}` : (cleanBase || '/')
}
