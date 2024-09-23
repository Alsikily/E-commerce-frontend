import { useAuthStore } from "~/stores/useAuthStore"

export default defineNuxtRouteMiddleware((to, from) => {

    const auth = useAuthStore();

    if (auth.verify) {
        return navigateTo('/verify-email');
    } else if (auth.isLogin) {
        return navigateTo('/');
    }

})