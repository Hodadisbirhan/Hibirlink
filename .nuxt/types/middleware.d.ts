import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "before-entry" | "before-forget-entry" | "before-register-entry" | "before-rul-entry" | "before-sign-in"
declare module "../../node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}
declare module 'nitropack' {
  interface NitroRouteConfig {
    appMiddleware?: MiddlewareKey | MiddlewareKey[] | Record<MiddlewareKey, boolean>
  }
}