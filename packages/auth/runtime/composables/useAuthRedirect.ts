export function useAuthRedirect(path?: string) {
  if (typeof path === 'string') {
    const authRedirect = useCookie<string | undefined>('authRedirect')
    authRedirect.value = path
    return authRedirect
  }

  return useCookie('authRedirect')
}
