import { useAuth } from "~~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const { setToSignInPageFrom, token } = useAuth();
  setToSignInPageFrom(from.path);
  if (token) return navigateTo("/");
  else return true;
});
