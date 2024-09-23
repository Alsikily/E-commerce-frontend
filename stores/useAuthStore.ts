import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {

    const user = ref<object | null>(null);
    const isLogin = ref<boolean>(false);
    const token = ref<string | null>(null);
    const verify = ref<boolean>(false);
    const timer = reactive({
        exipred: false,
        minutes: 0,
        seconds: 60 * 15,
        totalSeconds: 60 * 15
    });

    function startTimer() {
        timer.minutes = 0;
        timer.seconds = 60 * 15;
        timer.totalSeconds = 60 * 15;
        const timerInterval = setInterval(() => {
            if (timer.totalSeconds > 0) {
                timer.totalSeconds--;
                timer.minutes = Math.floor(timer.totalSeconds / 60);
                timer.seconds = timer.totalSeconds % 60;
            } else {
                timer.exipred = true;
                clearInterval(timerInterval);
            }
        }, 1000);
    }

    return { user, token, isLogin, verify, timer, startTimer };

}, {
    persist: true
})