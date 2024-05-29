export default defineNuxtRouteMiddleware((to) => {
  if (to.path !== '/login') {
    useAuthRedirect(to.fullPath)
  }
})
