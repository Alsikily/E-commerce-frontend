<template>
    <div>
        <NuxtLayout name="auth">
            <header v-if="authStore.verify">Verify E-mail</header>
            <form v-if="authStore.verify" @submit.prevent="authMethods.verify">
                <span class="verify-msg">We have sent verfication code to your email <span>{{ authStore.user.email }}</span></span>
                <div class="input">
                    <input type="text" placeholder="Code" v-model="authMethods.verifyEmailCode" maxlength="6" minlength="1">
                    <span class='error' v-if="authMethods.VerifyErrors?.verifyEmailCode" v-for="error in authMethods.VerifyErrors?.verifyEmailCode">{{ error }}</span>
                </div>
                <div class="expire">
                    <span class="timer">
                        <span class="not-expired" v-if="!authStore.timer.exipred">
                            Expire after: <span :class="['time', authStore.timer.minutes <= 0 ? 'danger' : '']">{{ authStore.timer.minutes }}:{{ authStore.timer.seconds }}</span>
                        </span>
                        <span class="expired" v-else>
                            Exipred code
                        </span>
                    </span>
                    <span class="resend" v-if="authStore.timer.exipred" @click="authMethods.sendVerificationCode">
                        resend
                    </span>
                </div>
                <div class="input submit">
                    <input type="submit" value="Verify">
                    <LayoutRequestingSpinner v-if="authMethods.authenticating" />
                </div>
            </form>
            <div class="veriefied" v-else>
                <header>Email verified successfully</header>
                <NuxtLink to="/">Shopping</NuxtLink>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>

    const authStore = useAuthStore();
    const authMethods = useAuthMethodsStore();
    authMethods.sendVerificationCode();

    // const timer = reactive({
    //     exipred: false,
    //     minutes: 0,
    //     seconds: 60 * 15,
    //     totalSeconds: 60 * 15
    // });

    // function startTimer() {
    //     const timerInterval = setInterval(() => {
    //         if (timer.totalSeconds > 0) {
    //             timer.totalSeconds--;
    //             timer.minutes = Math.floor(timer.totalSeconds / 60);
    //             timer.seconds = timer.totalSeconds % 60;
    //         } else {
    //             timer.exipred = true;
    //             clearInterval(timerInterval);
    //         }
    //     }, 1000)
    // }

    onMounted(() => {
        authStore.startTimer();
    });

    definePageMeta({
        middleware: 'verify'
    });

</script>

<style lang="scss" scoped>

    @use '~/scss/helpers/colors' as colors;

    form {
        .verify-msg {
            font-size: 14px;
            > span {
                color: colors.$color-primary;
                font-weight: bold;
            }
        }
        div.expire {
            text-align: left;
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            > span.timer {
                > span.not-expired {
                    .time {
                        color: colors.$color-primary;
                        font-weight: bold;
                        &.danger {
                            color: colors.$color-danger;
                        }
                    }
                }
                > span.expired {
                    color: colors.$color-danger;
                    font-weight: bold;
                }
            }
            > span.resend {
                cursor: pointer;
            }
        }
    }

    div.veriefied {
        > header {
            font-weight: bold;
            color: colors.$color-dark;
            margin-bottom: 10px;
        }
        > a {
            color: colors.$color-primary;
        }
    }

</style>
