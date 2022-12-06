export default defineNuxtRouteMiddleware((to, from) => {

  const config = useRuntimeConfig();
  const secret = config.STRAPI_PREVIEW_SECRET;

  if (from.query.secret !== secret || !from.query.slug) {
    return abortNavigation()
  }
  return navigateTo(`/${from.query.slug}?slug=${from.query.slug}`)
})