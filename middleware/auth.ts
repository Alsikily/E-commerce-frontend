import { useAuthStore } from "~/stores/useAuthStore"

export default defineNuxtRouteMiddleware((to, from) => {

    const auth = useAuthStore();

    if (!auth.isLogin) {
        return navigateTo('/login');
    } else if (auth.verify) {
        return navigateTo('/verify-email');
    }

})