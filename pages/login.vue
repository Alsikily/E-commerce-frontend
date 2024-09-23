<template>
    <div>
        <NuxtLayout name="auth">
            <header>Login</header>
            <form @submit.prevent="authMethods.login">
                <div class="input">
                    <input type="email" placeholder="E-mail" v-model="authMethods.loginData.email" maxlength="255" required>
                </div>
                <div class="input">
                    <input type="password" placeholder="password" v-model="authMethods.loginData.password" maxlength="255" minlength="6" required>
                    <span class='error' v-if="authMethods.LoginErrors">Invalid E-mail or password</span>
                </div>
                <NuxtLink class="goto" to='/register'>Create an account ?</NuxtLink>
                <div class="input submit">
                    <input type="submit" value="Login">
                    <LayoutRequestingSpinner v-if="authMethods.authenticating" />
                </div>
            </form>
        </NuxtLayout>
    </div>
</template>

<script setup>

    const authMethods = useAuthMethodsStore();

    definePageMeta({
        middleware: 'guest'
    });

</script>

<style lang="scss" scoped>
    a.goto {
        text-align: left;
        font-size: 13px;
        color: #001dff;
    }
</style>