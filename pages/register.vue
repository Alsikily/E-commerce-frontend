<template>
    <div>
        <NuxtLayout name="auth">
            <header>Register</header>
            <form @submit.prevent="authMethods.register">
                <div class="input">
                    <input type="text" placeholder="Username" v-model="authMethods.registerData.name" maxlength="255" minlength="5" required>
                    <span class='error' v-if="authMethods.RegisterErrors?.name" v-for="error in authMethods.RegisterErrors?.name">{{ error }}</span>
                </div>
                <div class="input">
                    <input type="email" placeholder="E-mail" v-model="authMethods.registerData.email" maxlength="255" required>
                    <span class='error' v-if="authMethods.RegisterErrors?.email" v-for='error in authMethods.RegisterErrors?.email'>{{ error }}</span>
                </div>
                <div class="input">
                    <input type="password" placeholder="password" v-model="authMethods.registerData.password" maxlength="255" minlength="6" required>
                    <span class='error' v-if="authMethods.RegisterErrors?.password" v-for="error in authMethods.RegisterErrors?.password">{{ error }}</span>
                </div>
                <NuxtLink class="goto" to='/login'>You have an account ?</NuxtLink>
                <div class="input submit">
                    <input type="submit" value="Register">
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
