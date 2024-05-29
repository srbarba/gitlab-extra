export function useAuthService() {
  return {
    user: useAuth().user,
    session: useAuth().session,
    login(provider: string) {
      const auth = useAuth()
      const redirect = useAuthRedirect()
      return auth.signIn(provider, { callbackUrl: redirect.value! })
    },
    logout() {
      return useAuth().signOut()
    }
  }
}
